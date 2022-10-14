let board = document.querySelector(`#board`)




for (let i = 0; i < 900; i++) {
    let pixel = document.createElement(`div`)
    board.appendChild(pixel)
}
let pixels = document.querySelectorAll(`div`)
let width = 30


// pixels[Math.floor(Math.random()*900)].style.backgroundColor = `black`
// pixels[Math.floor(Math.random()*900)].className = "snek"


pixels[0].className = `snek`
let snek = document.querySelectorAll(`.snek`)
snek.forEach((px) => {px.style.backgroundColor = `black`})


document.addEventListener(`keydown`, function(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 37 :
            console.log(`left`)
        break
        case 38 :
            console.log(`up`)
        break
        case 39 :
            console.log(`right`)
        break
        case 40 :
            console.log(`down`)
        break
        case 87 :
            console.log(`up`)
        break
        case 65 :
            console.log(`left`)
        break
        case 83 :
            console.log(`down`)
        break
        case 68 :
            console.log(`right`)
        break

    }

})