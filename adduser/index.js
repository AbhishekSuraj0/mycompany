var mobile = localStorage.getItem('position');
var mob = localStorage.getItem('usernumber')



async function callpostion() {

    if (mobile == "Distribitor") {
        document.getElementById("positon").innerHTML = `<option value="" >Select one</option>
            <option value="Customer">Customer</option>`
    } else if (mobile == "MasterID") {
        document.getElementById("positon").innerHTML = `<option value="" >Select one</option>
            <option value="Customer">Customer</option>
            <option value="Distribitor">Distributor</option>`
    } else if (mobile == "SuperID") {
        document.getElementById("positon").innerHTML = `<option value="" >Select one</option>
            <option value="MasterID">master</option>            
            <option value="Distribitor">Distributor</option>            
            <option value="Customer">Customer</option>`

    }else if (mobile == "Customer") {
        document.getElementById("positon").innerHTML = `<option value="" disabled >Select one</option>`
    }
}

callpostion()

async function addUser() {
    const position = document.getElementById("positon").value;
    const inputs = document.querySelectorAll("#createID input");
    const password = Math.random().toString(36).slice(-8);
    const name = inputs[0].value;
    const number = inputs[1].value;
    const gmail = inputs[2].value;
    const address = inputs[3].value;

    if (!position || !name || !number) {
        alert("Please fill required fields ❌");
        return;
    }

    const userdata = { name, number, gmail, address, position, password, mob };

    try {
        const res = await fetch("http://localhost:5000/add-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userdata)
        });

        const data = await res.json();

        if (data.success) {
            alert("User Added Successfully ✅");

            inputs.forEach(input => input.value = "");
            document.getElementById("positon").value = "";

        } else {
            alert(data.message || "Failed ❌");
        }

    } catch (err) {
        console.log(err);
        alert("Server Error ❌");
    }
}

/* Button Click */
document.querySelector("#createID button").onclick = addUser;
