let pusername = document.getElementById("pusername");
let password = document.getElementById("password");
let mainContainer = document.getElementById("container-login");

async function userLogin(pusername, password) {
    let person = JSON.parse(sessionStorage.getItem("person"));
    underHint = document.getElementById("under-hint");

    if (person.pusername !== pusername && person.password === password ||
        person.pusername !== pusername && person.password !== password
        || person.pusername == null || person.password == null) {
        underHint.innerHTML = "Seems like this username does not exist!";
        clearHint()
    }
    else if (person.pusername === pusername && person.password !== password) {
        underHint.innerHTML = "Seems like its the wrong pssword!";
        clearHint()
    }

    else if (person.pusername === pusername && person.password === password) {
        mainContainer.innerHTML = `
        <div class="loadingGif" >
        <img src="../images/loadingGif.gif"></img>
        </div>
        <p class="box sent-1">Cleaning up the profile for you</p>
        <p class="box sent-2">Throwing away some trash from last night</p>
        <p class="box sent-3">Fidding our puppy</p>
        <p class="box sent-4">Saying our prayers</p>
        <p class="box sent-5">Let me just open the door for you!</p>
        <div id="progBar">
        <div class="progressbarWrapper">
            <span id="pinkBar"></span>
        </div>`
        move()
        await delay(10000)
        window.location.href = "../HTML/todo-list.html";
    }
}

async function clearHint() {
    await delay(4000)
    hint = document.getElementById("hint-bar");
    underHint = document.getElementById("under-hint");
    hint.innerHTML = "";
    underHint.innerHTML = "";
}

// Creating an arrow function for timeout
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function move() {
    let elem = document.getElementById("pinkBar");
    let stepValue = 0;
    let id = setInterval(frame, 500);

    function frame() {

        if (stepValue >= 100) {
            clearInterval(id);
            elem.style.display = "none";

        } else {
            elem.style.display = "block";
            elem.style.width = (stepValue + 7) + "%";
            stepValue = (stepValue + 7);
        }
    }
}

