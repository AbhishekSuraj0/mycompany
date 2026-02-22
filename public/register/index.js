// Auto-fill referral code from URL
const params =  `${window.location.origin}`;
const ref = params.get("ref");

if (ref) {
    document.getElementById("referrer").value = ref;
}
const local = "https://iconstarbusiness.store/" ;
// Register function
async function registerUser() {
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const password = document.getElementById("password").value;
    const referrer = document.getElementById("referrer").value;

    const userdata = { name, number, password, referrer };

    try {
        const res = await fetch(`${local}register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userdata)
        });

        const data = await res.json();

        if (data.success) {
            alert("Registration Successful ✅");
            window.location.href = "./login/";
        } else {
            alert(data.message || "Registration Failed ❌");
        }

    } catch (err) {
        console.log(err);
        alert("Server Error ❌");
    }
}
