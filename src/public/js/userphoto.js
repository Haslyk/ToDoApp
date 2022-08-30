function hover(event){
    const card = document.getElementById('card' + event)
    const img = document.getElementById('img' + event)
    card.style.display = "flex"
    card.style.visibility = "visible"
    img.style.opacity = '0.4'

}

function leave(event){
    const card = document.getElementById('card' + event)
    const img = document.getElementById('img' + event)
    card.style.visibility = "hidden"
    img.style.opacity = '1'
}