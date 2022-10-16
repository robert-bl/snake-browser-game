
let board = document.querySelector(`#board`)


//generate board

for (let i = 0; i < 900; i++) {
    let pixel = document.createElement(`div`)
    pixel.classList.add(`pixel`)
    board.appendChild(pixel)
}
let pixels = document.querySelectorAll(`.pixel`)

//width variable used for determining vertical movement/collision
let widthInterval = 30


let snake = [80]
let snakeSize = 7


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


const dropApple = () => {
    let validDrops = []
    for (let i = 0; i < pixels.length; i++) {
        if (pixels[i].classList.contains(`snake`) === false) {
        validDrops.push(i)
        }
    }
    pixels[validDrops[Math.floor((Math.random() * validDrops.length))]].classList.add(`apple`)
}

dropApple()
let direction = 1

//move function
//determine which div the snake will move into
//determine collision (snake/wall/food)
//add new div to front of snake
//remove old div from end of snake
const moveFunction = () => {
    collisionDetector()
    snake.unshift(snake[0] + direction)
    while (snake.length > snakeSize) {snake.pop()}
    snakeDesignation()
    console.log(`snake is divs ${snake}`)
}





//keystroke detection
//need to change double-back prevention
document.addEventListener(`keydown`, function(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 37 :
            console.log(`left`)
            if (snake[1] !== snake[0] - 1) {direction = -1}
        break
        case 38 :
            console.log(`up`)
            if (snake[1] !== snake[0] - widthInterval) {direction = -widthInterval}
        break
        case 39 :
            console.log(`right`)
            if (snake[1] !== snake[0] + 1) {direction = 1}
        break
        case 40 :
            console.log(`down`)
            if (snake[1] !== snake[0] + widthInterval) {direction = widthInterval}
        break
        case 87 :
            console.log(`up`)
            if (snake[1] !== snake[0] - widthInterval) {direction = -widthInterval}
        break
        case 65 :
            console.log(`left`)
            if (snake[1] !== snake[0] - 1) {direction = -1}
        break
        case 83 :
            console.log(`down`)
            if (snake[1] !== snake[0] + widthInterval) {direction = widthInterval}
        break
        case 68 :
            console.log(`right`)
            if (snake[1] !== snake[0] + 1) {direction = 1}
        break
        case 32 :
            moveFunction()
        break

    }

})







//collision detection(walls)
const collisionDetector = () => {
//top hit
    if (snake[0] < widthInterval && direction === -widthInterval) {
        console.log(`wall hit top`)
    }
//bottom hit
    if (snake[0] > ((widthInterval * widthInterval) - widthInterval) && direction === widthInterval) {
        console.log(`wall hit bottom`)
    }
//left hit
    if (snake[0] % widthInterval === 0 && direction === -1) {
        console.log(`wall hit left`)
    }
//right hit
    if ((snake[0]+1) % widthInterval === 0 && direction === 1) {
        console.log(`wall hit right`)
    }
//snake hit
    if ((pixels[snake[0] + direction].classList.contains(`snake`))) {
        console.log(`snake hit`)
    }
//apple hit
    if ((pixels[snake[0] + direction].classList.contains(`apple`))) {
        pixels[snake[0] + direction].classList.remove(`apple`)
        //give points
        console.log(`10 points!`)
        snakeSize += 2
        dropApple()
    }
}
// setInterval(moveFunction, 150)

