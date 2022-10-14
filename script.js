
let board = document.querySelector(`#board`)


//generate board

for (let i = 0; i < 900; i++) {
    let pixel = document.createElement(`div`)
    board.appendChild(pixel)
}
let pixels = document.querySelectorAll(`div`)

//width variable used for determining vertical movement/collision
let width = 30


//snake is an array of occupide divs
//divs in snake array should have "snake" class
//divs with snake class should have background-color black
//divs without 

let snake = [0]
let snakeSize = 3

const snakeDesignation = () => {
    for (let i = 0; i < pixels.length; i++) {
        if (snake.includes(i)) {
            pixels[i].classList.add(`snake`)
        } else if (snake.includes(i) === false) {
            pixels[i].classList.remove(`snake`)
        }
    }
}

snakeDesignation()

document.addEventListener(`keydown`, function(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 37 :
            console.log(`left`)
            snake.unshift(snake[0] - 1)
            while (snake.length > snakeSize) {
            snake.pop()}
            console.log(`snake is divs ${snake}`)
        break
        case 38 :
            console.log(`up`)
            snake.unshift(snake[0] - width)
            while (snake.length > snakeSize) {
                snake.pop()}
            console.log(`snake is divs ${snake}`)
        break
        case 39 :
            console.log(`right`)
            snake.unshift(snake[0] + 1)
            while (snake.length > snakeSize) {
                snake.pop()}
            console.log(`snake is divs ${snake}`)
        break
        case 40 :
            console.log(`down`)
            snake.unshift(snake[0] + width)
            while (snake.length > snakeSize) {
                snake.pop()}
            console.log(`snake is divs ${snake}`)
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
    snakeDesignation()
})