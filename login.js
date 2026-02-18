
const local = 'https://mycompany-chi.vercel.app/' || "http://localhost:5000/" ;

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

async function loadUsers(a, b ,c) {
    try {
        const res = await fetch(`${local}u`);
        const data = await res.json();

        const user = data.find(u => a == u.number);

        if (user) {
            if (a == user.number && b == user.password) {


                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("usernumber", user.number);
                localStorage.setItem("position", user.position);
                window.location.href = "../public"

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
