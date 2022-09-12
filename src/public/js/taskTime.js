const dates = document.querySelectorAll('.date')

console.log(dates.length)

const dateArr = [
    year = new Date().getFullYear(),
    month = new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
    day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate(),
]
const timeArr = [
    hours = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours(),
    minutes = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes(),
]

const now = dateArr.join('-')
const time = timeArr.join(':')

for (let i = 0; i < dates.length; i++) {
    
    document.getElementById(`date${i}`).min = now + 'T' + time
}