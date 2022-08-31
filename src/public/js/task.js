const allTasks = document.getElementById('allTask')
const compTask = document.getElementById('complatedTask')
const notCompTask = document.getElementById('notComplatedTask')
const processTask = document.getElementById('processingTask')
const notStTask = document.getElementById('notStartedTask')



function allTask() {
    allTasks.style.display = "block"
    compTask.style.display = "none"
    notCompTask.style.display = "none"
    processTask.style.display = "none"
    notStTask.style.display = "none"
    console.log("All task")
}

function complatedTask() {
    allTasks.style.display = "none"
    compTask.style.display = "block"
    notCompTask.style.display = "none"
    processTask.style.display = "none"
    notStTask.style.display = "none"
    console.log("Only complated")
}

function notcomplatedTask() {
    allTasks.style.display = "none"
    compTask.style.display = "none"
    notCompTask.style.display = "block"
    processTask.style.display = "none"
    notStTask.style.display = "none"
    console.log("Only notComplated")
}

function processingTask() {
    allTasks.style.display = "none"
    compTask.style.display = "none"
    notCompTask.style.display = "none"
    processTask.style.display = "block"
    notStTask.style.display = "none"
    console.log("Only processing")
}

function notstartTask() {
    allTasks.style.display = "none"
    compTask.style.display = "none"
    notCompTask.style.display = "none"
    processTask.style.display = "none"
    notStTask.style.display = "block"
    console.log("Only not start")
}