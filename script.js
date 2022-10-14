
let board = document.querySelector(`#board`)


//generate board

for (let i = 0; i < 900; i++) {
    let pixel = document.createElement(`div`)
    board.appendChild(pixel)
}
let pixels = document.querySelectorAll(`div`)

//width variable used for determining vertical movement/collision
let widthInterval = 30


//snake is an array of occupide divs
//divs in snake array should have "snake" class
//divs with snake class should have background-color black
//divs without 

let snake = [80]
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

let direction = 1

//move function
const moveFunction = () => {
    snake.unshift(snake[0] + direction)
    while (snake.length > snakeSize) {
    snake.pop()}
    console.log(`snake is divs ${snake}`)
}






document.addEventListener(`keydown`, function(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 37 :
            console.log(`left`)
            if (direction !== 1) {direction = -1}
        break
        case 38 :
            console.log(`up`)
            if (direction !== widthInterval) {direction = -widthInterval}
        break
        case 39 :
            console.log(`right`)
            if (direction !== -1) {direction = 1}
        break
        case 40 :
            console.log(`down`)
            if (direction !== -widthInterval) {direction = widthInterval}
        break
        case 87 :
            console.log(`up`)
            if (direction !== widthInterval) {direction = -widthInterval}
        break
        case 65 :
            console.log(`left`)
            if (direction !== 1) {direction = -1}
        break
        case 83 :
            console.log(`down`)
            if (direction !== -widthInterval) {direction = widthInterval}
        break
        case 68 :
            console.log(`right`)
            if (direction !== -1) {direction = 1}
        break
        case 32 :
            moveFunction()
        break

    }
    snakeDesignation()
})



//movement
//determine which div the snake will move into
//determine collision (snake/wall/food)
//add new div to front of snake
//remove old div from end of snake

//collision detection





// setInterval(moveFunction, 1000)

