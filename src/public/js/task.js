const allTasks = document.getElementById('allTask')
const compTask = document.getElementById('complatedTask')
const notCompTask = document.getElementById('notComplatedTask')



function allTask() {
    allTasks.style.display = "block"
    compTask.style.display = "none"
    notCompTask.style.display = "none"
    console.log("All task")
}

function complatedTask() {
    allTasks.style.display = "none"
    compTask.style.display = "block"
    notCompTask.style.display = "none"
    console.log("Only complated")
}

function notcomplatedTask() {
    allTasks.style.display = "none"
    compTask.style.display = "none"
    notCompTask.style.display = "block"
    console.log("Only notComplated")
}