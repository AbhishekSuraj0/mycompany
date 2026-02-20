var a1 = document.getElementById('addpromocode');
var a2 = document.getElementById('addpromocode');
var f1 = document.getElementsByClassName('followka')[0];
var f2 = document.getElementsByClassName('followka')[0]

function addcode() {
    a1.style.display = "block";
    f1.style.display = "none"
}


function followlinks() {
    f1.style.display = "block";
    a1.style.display = "none";
}

function closebtn2() {
    f2.style.display = "none"
}
function closebtn() {
    a2.style.display = "none"
}

async function toggleSidebar() {
    const sidebar = await document.getElementById("sidebar");

    if (sidebar.style.left === "-250px") {
        sidebar.style.left = "0";
        document.getElementById('menu-btn').innerHTML = "close"
    } else {
        sidebar.style.left = "-250px";
        document.getElementById('menu-btn').innerHTML = "menu"
    }
};

var withdradDiv = document.getElementById('withdradDiv1')


function closebtn3() {
    var withdradDiv = document.getElementById('withdradDiv1')
    withdradDiv.style.display = "none"
}


