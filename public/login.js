
const local = "http://localhost:5000/";

async function loginUser() {
    const usernumber = document.getElementById("usernumber").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");


    let deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
    const device = { deviceId }

    if (usernumber === "" || password === "") {
        message.style.color = "red";
        message.innerHTML = "Please fill all fields ❌";
        return;
    }
    loadUsers(usernumber, password, device);

};

async function loadUsers(a, b, c) {
    const usernumber = a;
    const userpassword = b;

    const users = { usernumber, userpassword }

    try {

        const res = await fetch(`${local}u`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(users)
        });

        const data = await res.json();
        

        if (data) {

            if (a == data.number && b == data.password) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("usernumber", data.number);
                localStorage.setItem("position", data.position);
                window.location.href = "../main/"

            } else {
                alert("Please Inter Correct Password")
            }

        } else {
            alert("❌ User Not Found");
        }



    } catch (err) {
        console.log("Fetch Error:", err);
    }
}
