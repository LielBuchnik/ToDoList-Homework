let elem = document.getElementById('todoColumn');
let doneTaskColumn = document.getElementById('doneTaskColumn');
let flag = false;
let tasksArr = []
let doneTaskColumnArr = []


let xhr = new XMLHttpRequest();
xhr.open("GET", "../json/tasks.json", true);
xhr.onload = function () {
    let data = JSON.parse(this.responseText);
    let allTasks = data.tasks;
    tasksArr.push(...allTasks);
    console.log(tasksArr);
}
xhr.send();

class Task {
    constructor(tname, priority, description) {
        this.tname = tname;
        this.priority = priority;
        this.description = description;
    }
}

document.getElementById("addTask").addEventListener("click", addTask)

function addTask() {
    let tname = document.getElementById('tname');
    let priority = document.getElementById('priority');
    let description = document.getElementById('description');

    if (tname.value == "" || priority.value == "" || description.value == "") {
        alertHint("missing-args", tname.value);
    } else {
        let flag = false;
        for (let i in tasksArr) {
            if (tname.value == tasksArr[i].tname) {
                flag = true;
                break;
            }
        }
        if (flag == true) {
            alertHint("task-exists", tname.value);
        } else {
            let newTask = new Task(tname.value, priority.value, description.value);
            tasksArr.push(newTask);
            console.log(tasksArr)
            alertHint("task-added", tname.value);
        }
    }
}

// Found it online <3
// This will help us see JSON added tasks when page loads
//                Site Action - Function to run
window.addEventListener('load', welcomeUser);

function welcomeUser() {
    let person = JSON.parse(sessionStorage.getItem("person"));
    let welcomeUser = document.getElementById("welcome-user");
    welcomeUser.innerHTML = `Welcome, <span id="username-display"">${person.pusername}</span>`
}

window.addEventListener('load', showTasks);

document.getElementById("showTasks").addEventListener("click", showTasks)

function showTasks() {
    elem.innerHTML = "";
    doneTaskColumn.innerHTML = "";
    for (let i in tasksArr) {
        let todoT = tasksArr[i];
        let priorityClass = todoT.priority;
        elem.innerHTML += `<div class="task-card">
        <ul>
        <span class="card-title">${todoT.tname}</span>
        <span class="priority ${priorityClass}">${todoT.priority}</span>
        <p>${todoT.description}</p>
        </ul>
        <button id="deleteButton${i}" class="del-move-buttons delete-button" onclick="delHint(${i})">Delete</button><div>
        <button id="deleteConfirmation${i}" class="del-move-buttons delete-confirmation-button" onclick="deleteItem(${i})">Are You Sure?</button><div>
        <button id="nextCardButton" class="del-move-buttons" onclick="moveToNextCard(${i})">Move</button><div>`;
        elem.style.height = `${elem.scrollHeight}px`;
        elem.style.transition = "0.3s";
    }
    for (let i in doneTaskColumnArr) {
        let obj2 = doneTaskColumnArr[i];
        let priorityClass = obj2.priority;
        doneTaskColumn.innerHTML += `<div class="task-card">
        <ul>
        <span class="card-title">${obj2.tname}</span>
        <span class="priority ${priorityClass}">${obj2.priority}</span>
        <p>${obj2.description}</p>
        </ul>
        <span class="doneCard"></span>`;
        doneTaskColumn.style.height = `${doneTaskColumn.scrollHeight}px`;
        doneTaskColumn.style.transition = "0.3s";
        console.log(doneTaskColumnArr);
    }
}

document.getElementById("sortPriority").addEventListener("click", sortTaskPriority);
document.getElementById("sortTaskLowToHigh").addEventListener("click", sortTaskLowToHigh);
document.getElementById("sortName").addEventListener("click", sortTasksName);

function sortTaskPriority() {
    let priorityOrder = ["high", "medium", "low"];
    tasksArr.sort((a, b) => {
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });
    showTasks();
}

function sortTaskLowToHigh() {
    let priorityOrder = ["low", "medium", "high"];
    tasksArr.sort((a, b) => {
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });
    showTasks();
}

function sortTasksName() {
    tasksArr.sort((a, b) => a.tname.localeCompare(b.tname));
    showTasks();
}

async function delHint(arg) {
    delBut = document.getElementById(`deleteButton${arg}`);
    delConf = document.getElementById(`deleteConfirmation${arg}`);
    delBut.style.display = "none";
    delConf.style.display = "block";
    await delay(4000)
    delBut.style.display = "block";
    delConf.style.display = "none";
}

async function alertHint(arg, tname) {
    let alertDiv = document.getElementById("alertDiv");
    if (arg == "task-exists") {
        alertDiv.innerHTML = `Task Name: "${tname}" Already exists in the system!`
        await delay(3000)
        alertDiv.innerHTML = "";
    }
    else if (arg == "task-added") {
        alertDiv.innerHTML = `Task ${tname} Added Successfully!`
        await delay(3000)
        alertDiv.innerHTML = "";
    } else if (arg == "missing-args") {
        alertDiv.innerHTML = `I know its not you, but some fields need to be filled... ❤`
        await delay(4500)
        alertDiv.innerHTML = "";
    }
}

function moveToNextCard(i) {
    let movedTask = tasksArr.splice(i, 1)[0];
    doneTaskColumnArr.push(movedTask);
    elem.style.height = `fit-content`;
    doneTaskColumn.style.height = `fit-content`;
    showTasks();
}

function deleteItem(arg) {
    if (arg in tasksArr) {
        tasksArr.splice(arg, 1);
        elem.style.height = `fit-content`;
    } else if (arg in doneTaskColumn) {
        doneTaskColumn.splice(arg, 1);
        doneTaskColumn.style.height = `fit-content`;
    }
    showTasks();
}

document.getElementById("clearDoneColumn").addEventListener("click", delDone);
document.getElementById("clearDoneConfirm").addEventListener("click", clearDoneColumn);

async function delDone() {
    delBut = document.getElementById(`clearDoneColumn`);
    delConf = document.getElementById(`clearDoneConfirm`);
    delBut.style.display = "none";
    delConf.style.display = "block";
    await delay(4000)
    delBut.style.display = "block";
    delConf.style.display = "none";
}

async function clearDoneColumn() {
    doneTaskColumnArr.length = 0;
    showTasks();
    doneTaskColumn.style.height = `fit-content`;
}

// Change Backgrounds(ChooseBG)

let mainContainer = document.getElementById("mainContainer");
let chooseBgDiv = document.getElementById("chooseBG-Cont");
currentBG = document.getElementsByTagName('body')[0];
pName = document.getElementById("username-display");

function goBackFromChooseBG(){
currentBG.style.backgroundSize = "cover";
mainContainer.style.display = "block";
chooseBgDiv.style.display = "none";
}

function displayChangeBG() {
    mainContainer.style.display = "none";
    chooseBgDiv.style.display = "block";
}

async function chooseBackgroundSPD() {
    let pName = document.getElementById("username-display");
    currentBG.style.background = "url('../images/WPs/spidermanWP.jpg') no-repeat center center fixed";
    goBackFromChooseBG()
    pName.style.color = "white";
}

function chooseBackgroundHLND() {
    let pName = document.getElementById("username-display");
    currentBG.style.background = "url('../images/WPs/hollandWP.jpg') no-repeat center center fixed";
    goBackFromChooseBG()
    pName.style.color = "#0cffaa";
}

function chooseBackgroundNTR() {
    let pName = document.getElementById("username-display");
    currentBG.style.background = "url('../images/WPs/natureWP.jpg') no-repeat center center fixed";
    currentBG.style.backgroundRepeat = 'no-repeat';
    currentBG.style.backgroundAttachment = 'fixed';
    mainContainer.style.display = "block";
    chooseBgDiv.style.display = "none";
    pName.style.color = "black";
}

function defaultBG() {
    let pName = document.getElementById("username-display");
    currentBG.style.background = "linear-gradient(#000945, #000077)";
    goBackFromChooseBG()
    pName.style.color = "#0cffaa";
}

// End of Choose BG

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}