const local = "https://iconstarbusiness.store/";

const number = localStorage.getItem("usernumber");
const position1 = localStorage.getItem("position");


var s1 = document.getElementById('s');
var m1 = document.getElementById('m');
var d1 = document.getElementById('d');
var c1 = document.getElementById('c');




if (position1 == "MasterID") {
    s1.style.display = "none"
}
if (position1 == "Distribitor") {
    m1.style.display = "none";
    s1.style.display = "none"
}
// Generate referral link
if (number) {
    const referLink = `${window.location.origin}/register?ref=${number}`;
    document.getElementById("reflink").value = referLink;
}

// Copy function
function copyRefLink() {
    const input = document.getElementById("reflink");
    input.select();
    input.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(input.value);

    alert("Referral link copied ✅");
}


async function user(a) {

    document.getElementById('view').innerHTML = "";




    const res = await fetch(`${local}referlist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({number})
    });


    const data = await res.json();
    const userdata = data.Customer


    console.log(userdata)
;

    if (!userdata) {
        alert("User not found");
        return;
    }


   
    userdata.forEach((o, index) => {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${o.name}</td>
            <td>${o.number}</td>
        `;

        document.getElementById('view').appendChild(tr);
    });
}


// const master = "MasterID";
// const Customer = "Customer";
// const Distribitor = "Distribitor";
// const SuperID = "SuperID";



function m() {
    user("MasterID")
}

function d() {
    user("Distribitor")
}

function s() {
    user("SuperID")
}
function c() {
    user("Customer")
}


