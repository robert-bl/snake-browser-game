
let board = document.querySelector(`#board`)
let scoreBoard = document.querySelector(`#score`)
let moveInterval = 150
let playButton = document.querySelector(`#play`)
let gameActive = false


//generate board

for (let i = 0; i < 900; i++) {
    let pixel = document.createElement(`div`)
    pixel.classList.add(`pixel`)
    board.appendChild(pixel)
}
let pixels = document.querySelectorAll(`.pixel`)

//width variable used for determining vertical movement/collision
let widthInterval = 30

let score = 0
scoreBoard.innerText = `Points: ${score}`

//starting snake
let snake = [435,434]
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
    if (gameActive === true) {
        collisionDetector()
    }
    if (gameActive === true) {
        snake.unshift(snake[0] + direction)
        while (snake.length > snakeSize) {snake.pop()}
        snakeDesignation()
        console.log(`snake is divs ${snake}`)
    }
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
        gameActive = false
    }
//bottom hit
    if (snake[0] > ((widthInterval * widthInterval) - widthInterval) && direction === widthInterval) {
        console.log(`wall hit bottom`)
        gameActive = false
    }
//left hit
    if (snake[0] % widthInterval === 0 && direction === -1) {
        console.log(`wall hit left`)
        gameActive = false
    }
//right hit
    if ((snake[0]+1) % widthInterval === 0 && direction === 1) {
        console.log(`wall hit right`)
        gameActive = false
    }
//snake hit
    if ((pixels[snake[0] + direction].classList.contains(`snake`))) {
        console.log(`snake hit`)
        gameActive = false
    }
//apple hit
    if ((pixels[snake[0] + direction].classList.contains(`apple`))) {
        pixels[snake[0] + direction].classList.remove(`apple`)
        //give points
        score += 10
        //doubled with scroe definiths, consider simplifying
        scoreBoard.innerText = `Points: ${score}`
        snakeSize += 2
        dropApple()
    }
}

playButton.addEventListener(`click`, () => {
    gameActive = true
    clearInterval(moveInterval)
    moveInterval = 150
    runGame()
})

const runGame = () => {
    if (gameActive === true) {
        return setInterval(moveFunction, 150)
    }
}