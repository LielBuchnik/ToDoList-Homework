let pfname = document.getElementById("pfname");
let pusername = document.getElementById("pusername");
let page = document.getElementById("page");
let pgender = document.getElementById("pgender");
let password = document.getElementById("password");
let pconfirm = document.getElementById("password-confirm");
let pemail = document.getElementById("pemail");
let emailconfirm = document.getElementById("pemail-confirm");

document.getElementById("resetLoginForm").addEventListener("click", resetHint);
document.getElementById("resetLoginForm").addEventListener("dblclick", resetLoginForm);

function userSubmition(pfname, pusername, page, pgender, password, pconfirm, pemail, emailconfirm) {
    underHint = document.getElementById("under-hint");

    let personObj = {
        pfname: pfname,
        pusername: pusername,
        page: page,
        pgender: pgender,
        password: password,
        pconfirm: pconfirm,
        pemail: pemail,
        emailconfirm: emailconfirm
    }

    if (!pfname || !pusername || !page || !pgender) {
        underHint.innerHTML = "YOU FORGOT TO FILL SOME INPUTS!";
        clearHint()
        sessionStorage.clear();
        return false;
    } else
     if (password !== pconfirm || pemail !== emailconfirm || password !== pconfirm && pemail !== emailconfirm) {
        underHint.innerHTML = "Password and/or email do not match.";
        clearHint()
        sessionStorage.clear();
        return false;
    }else 
    {
        sessionStorage.setItem("person", JSON.stringify(personObj));
        window.location.href = ("../HTML/login-page.html");
    }
}


async function clearHint() {
    await delay(3000)
    hint = document.getElementById("hint-bar");
    underHint = document.getElementById("under-hint");
    hint.innerHTML = "";
    underHint.innerHTML = "";
}

function resetHint() {
    hint = document.getElementById("hint-bar");
    hint.innerHTML = "*Double Click To Reset The Form";
}


function resetLoginForm() {
    hint.innerHTML = "";
    pfname.value = '';
    pusername.value = '';
    page.value = '';
    pgender.value = '';
    password.value = '';
    pconfirm.value = '';
    pemail.value = '';
    emailconfirm.value = '';
    sessionStorage.clear();
    console.log("You Successfuly Resetted The Data");
}

// Creating an arrow function for timeout
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
