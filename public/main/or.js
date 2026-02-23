var number = localStorage.getItem("usernumber")
var position = localStorage.getItem("position")

const local = "https://backendcode-ecrf.onrender.com/";

async function loadUsers(a) {
    const usernumber = a;
    try {
        const res = await fetch(`${local}u`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usernumber })
        });
        const data = await res.json();
        if (data) {
            document.getElementById('username').innerHTML = `Wellcome ${data.name} JI`;
            document.getElementById('today').innerHTML = `<span>₹</span> ${data.wallet.todayincome.toFixed(2)}`;
            document.getElementById('yesterday').innerHTML = `<span>₹</span> ${data.wallet.yesterdayincome.toFixed(2)}`;
            document.getElementById('montly').innerHTML = `<span>₹</span> ${data.wallet.monthly.toFixed(2)}`;
            document.getElementById('total').innerHTML = `<span>₹</span> ${data.wallet.totalincome.toFixed(2)}`;
            var historyTable = document.getElementById("history");

            data.History.reverse();

            let row1 = data.History.slice(0, 25);
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

loadUsers(number)

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

        const userpromocode = await res2.json()

        if (userpromocode.status === "Used" && userpromocode.promocode === promocode && userpromocode.amount === amount) {

            if (userpromocode) {

                const wallet = amount;
                const referwallet = wallet;


                const userinfomation = { number, wallet, referwallet, promocode, amount }
                const res2 = await fetch(`${local}updatewallet`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userinfomation)
                });

                const updatedata = await res2.json();

            } else {
                alert("Promocode is not valid")
            }

            promocodeInput.value = "";
            amountInput.value = "";
            document.getElementById('addpromocode').style.display = "none"
            alert("Your Promocode are Added")
        } else {
            alert("Your Promocode is Already is Used , Contact to admin")
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
    document.getElementById('withdrawamount').innerHTML = ` Withdrawable Amount <span>Rs </span>${data[0].wallet.todayincome.toFixed(2)}`

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



