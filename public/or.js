var number = localStorage.getItem("usernumber")
var position = localStorage.getItem("position")

const local = "http://localhost:5000/";

async function loadUsers(a) {
    try {
        const res = await fetch(`${local}u`);
        const data = await res.json();

        const user = data.find(u => a == u.number);
        if (user) {
            document.getElementById('username').innerHTML = `Wellcome ${user.name} JI`;
            document.getElementById('today').innerHTML = `<span>₹</span> ${user.wallet.todayincome.toFixed(2)}`;
            document.getElementById('yesterday').innerHTML = `<span>₹</span> ${user.wallet.yesterdayincome.toFixed(2)}`;
            document.getElementById('montly').innerHTML = `<span>₹</span> ${user.wallet.monthly.toFixed(2)}`;
            document.getElementById('total').innerHTML = `<span>₹</span> ${user.wallet.totalincome.toFixed(2)}`;
            var historyTable = document.getElementById("history");

            user.History.reverse();

            let row1 = user.History.slice(0, 25);
            row1.forEach((element, index) => {
                let tr = document.createElement("tr")
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${element.timestamp}</td>
                    <td>${element.summary}</td>
                    <td>₹${element.amount}</td>                    
                   <td>
    <a 
        style="
            text-decoration: none;
            color: ${element.status === "Pending" ? "#071bf0" : "green"};
        "
        href="${element.status === "Pending"
                        ? `https://wa.me/916387215755/?text=This amount ₹${element.amount} is Pending. Please check. My User ID is ${number}`
                        : "#"
                    }"
    >
        ${element.status}
    </a>
</td>      
                      `;
                historyTable.appendChild(tr);

            });


        } else {
            alert("User not Found")
        }

    } catch (err) {
        console.log("Fetch Error:", err);
    }
}

async function userdata1() {
    var userkanumber = localStorage.getItem('usernumber')
    userdata = { userkanumber };
    try {
        const res1 = await fetch(`${local}o`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdata)
        });
        const data = await res1.json();
        loadUsers(userkanumber);

    } catch (err) {
        console.log("Error:", err);
    }
}

userdata1();


// open and off side bar



function logout() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("usernumber");
    localStorage.removeItem("deviceId");

    window.location.href = "../";
}




async function comparepromocode() {
    const promocodeInput = document.getElementById('pcode');
    const amountInput = document.getElementById("pamount");

    const promocode = promocodeInput.value;
    const amount = amountInput.value;

    const promocodedata = { promocode, amount };

    try {

        const res2 = await fetch(`${local}k`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(promocodedata)
        });

        const data2 = await res2.json();


        const matchpromocode = data2.find(
            k => amount == k.amount && promocode == k.promocode && "Active" == k.status
        );


        const userinfo = await fetch(`${local}u`);
        const userinfo1 = await userinfo.json()
        const userfilter = await userinfo1.find(o => number == o.number);
        const userfiltername = userfilter.name;
        const refernumber = userfilter.Refferal;
        const addamount = amount / 10.;
        const amount1 = userfilter.wallet.todayincome + addamount;
        const referuser = await userinfo1.find(p => refernumber == p.Refferal);
        const referamount = addamount / 10;
        const referwallet = referuser.wallet.todayincome + referamount;






        if (matchpromocode) {
            try {
                const addamountvalue = { userfiltername, amount1, number, amount, addamount, referamount, referwallet, refernumber, promocode }
                const updatewallet = await fetch(`${local}updatewallet`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(addamountvalue)
                });
                const amountres = await updatewallet.json();


            } catch (err) {
                console.log(err)
            }

            document.getElementById('addpromocode').style.display = "none";
            alert("Your Promocode has Added successfully")

            /* ✅ CLEAR INPUTS CORRECTLY */
            promocodeInput.value = "";
            amountInput.value = "";

        } else {
            alert("Promocode is not valid ❌");
            /* ✅ CLEAR INPUTS */
            promocodeInput.value = "";
            amountInput.value = "";
        }

    } catch (err) {
        console.log("Error:", err);
    }
}
var withdradDiv = document.getElementById('withdradDiv1')
async function withdraw() {

    withdradDiv.style.display = "block"



    var getamount = { number, position }

    var anount = await fetch(`${local}withdraw`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(getamount)
    })
    var data = await anount.json()
    document.getElementById('withdrawamount').innerHTML = ` Withdrawable Amount <span>Rs </span>${data[0].wallet.todayincome}`

}

async function withdrawnow() {
    var getamount = { number, position }

    var anount = await fetch(`${local}withdraw`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(getamount)
    })
    var data = await anount.json()


    var minusamount = data[0].wallet.todayincome
    var withdrawAmount = document.getElementById('withdrawAmount').value

    // console.log(minusamount)

    if (withdrawAmount) {
        if (minusamount >= withdrawAmount) {
            var finalamount = minusamount - withdrawAmount;

            const amountdata = { finalamount, number, withdrawAmount }

            const amountupadet1 = await fetch(`${local}updateamount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(amountdata)
            });

            const userupdateamount = await amountupadet1.json()
            withdradDiv.style.display = "none"
            alert(userupdateamount.message)

        } else {
            alert("incificient fund")
        }
    } else {
        alert("Please Enter Amount")
    }


}



