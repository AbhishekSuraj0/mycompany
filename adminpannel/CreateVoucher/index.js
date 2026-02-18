var url ="http://localhost:5000/" ;

async function saveData() {

    const amount = document.getElementById("amount").value;
    const promocode = document.getElementById("promocode").value;
    const transaction = document.getElementById("transaction").value;


    const n = new Date();
    const pad = (num) => String(num).padStart(2, '0');

    const ntimes = `${pad(n.getDate())}-${pad(n.getMonth() + 1)}-${n.getFullYear()} ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
    const status = "Active";
    const msg = document.getElementById("msg");



    const data = { amount, promocode, ntimes, status, transaction };

    try {

        const res = await fetch(`${url}promocode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message)

        msg.style.color = "green";
        msg.innerHTML = "Data Saved Successfully ✅";

        console.log(result.message);

    } catch (err) {
        msg.style.color = "red";
        msg.innerHTML = "Server Error ❌";
        console.log(err);
    }
}
