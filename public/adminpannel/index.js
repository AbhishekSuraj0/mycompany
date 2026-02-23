const local = "https://backendcode-ecrf.onrender.com/" ;

async function saveHistory() {

    const wallet = Number(document.getElementById("wallet").value);
    const summary = document.getElementById("summary").value;
    const number = document.getElementById("number1").value;

    if (!wallet || wallet <= 0) {
        alert("Enter valid amount ❌");
        return;
    }

    const data = { wallet, summary, number };

    try {
        const res = await fetch(`${local}addWallet`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
            document.getElementById("wallet").value = "";
            document.getElementById("summary").value = "";
            document.getElementById("number1").value = "";
            alert("Wallet Updated ✅");
        }

    } catch (err) {
        console.log("Error:", err);
    }
}
