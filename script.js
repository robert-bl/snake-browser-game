//Citations in ReadMe file

//Board variables
let board = document.querySelector(`#board`)
let snakePixels = document.querySelectorAll(`.snake`)

//Interface variables
let scoreBoard = document.querySelector(`#score`)
let highScoreBoard = document.querySelector(`#highScore`)
let score = 0
let highScore = 0
scoreBoard.innerText = `${score}`
highScoreBoard.innerText = `${highScore}`
let playButton = document.querySelector(`#play`)
let resetButton = document.querySelector(`#reset`)
let speedButtons = document.querySelectorAll(`.speed`)
let slowButton = document.querySelector(`#slow`)
let avgButton = document.querySelector(`#avg`)
let fastButton = document.querySelector(`#fast`)
let fasterButton = document.querySelector(`#faster`)

//Game variables
let gameActive = false
let moveInterval = 150

//generate board
for (let i = 0; i < 900; i++) {
    let pixel = document.createElement(`div`)
    pixel.classList.add(`pixel`)
    board.appendChild(pixel)
}

let pixels = document.querySelectorAll(`.pixel`)


//width variable used for determining vertical movement/collision
let widthInterval = 30
//designate edge pixels
let edges = []

const defineEdges = () => {
    //top
    for (let i = 0; i < widthInterval; i++) {
        edges.push(i)
    }
    //right
    for (let i = (widthInterval * 2) - 1; i < (widthInterval * widthInterval) - widthInterval; i++)
        if ((i + 1) % widthInterval === 0) {
            edges.push(i)
        }
    //bottom
    for (let i = (widthInterval * widthInterval) - widthInterval; i < widthInterval * widthInterval; i++) {
        edges.push(i)
    }
    //left
    for (let i = widthInterval; i < (widthInterval * widthInterval) - (widthInterval); i++) {
        if (i % widthInterval === 0) {
            edges.push(i)
        }
    }
}
defineEdges()

//set starting snake
let snake = [435,434,433]
let snakeSize = 3
let direction = 1

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

//apple generator
const dropApple = () => {
    let validDrops = []
    for (let i = 0; i < pixels.length; i++) {
        if (pixels[i].classList.length === 1) {
        validDrops.push(i)
        }
    }
    pixels[validDrops[Math.floor((Math.random() * validDrops.length))]].classList.add(`apple`)
    
}
dropApple()

//obstacle generator
const dropObst = () => {
    if (Math.random() < 0.25) {
        let validDrops = []
        let inPath = []
        for (let i = 1; i <= 3; i++) {
        inPath.push(snake[0] + (direction*i))
        }
        for (let i = 0; i < pixels.length; i++) {
            if (pixels[i].classList.length === 1 && inPath.includes(i) === false && edges.includes(i) === false) {
                validDrops.push(i)
            }
        }
        if (validDrops.length !== 0) {
            pixels[validDrops[Math.floor((Math.random() * validDrops.length))]].classList.add(`obst`)
        }
    }
}

//constriction detection for obstacles
const detectConstriction = () => {
    for (let i = 0; i < pixels.length; i++) {
        if (pixels[i].classList.contains(`obst`)) {
            let totalAdjacents = 0
            if (pixels[i + 1].classList.contains(`snake`)) {
                totalAdjacents++
            }
            if (pixels[i - 1].classList.contains(`snake`)) {
                totalAdjacents++
            }if (pixels[i + widthInterval].classList.contains(`snake`)) {
                totalAdjacents++
            }if (pixels[i - widthInterval].classList.contains(`snake`)) {
                totalAdjacents++
            }
            if (totalAdjacents > 2) {
                pixels[i].classList.remove(`obst`)
                pixels[i].classList.add(`golden`)
            }
        }
    }
}



//move function
const moveFunction = () => {
    if (gameActive === true) {
        collisionDetector()
    }
    if (gameActive === true) {
        snake.unshift(snake[0] + direction)
        while (snake.length > snakeSize) {snake.pop()}
        snakeDesignation()
        detectConstriction()
    }
}

//Log high score
const logHighScore = () => {
    if (score > highScore) {
        highScore = score
        switch (moveInterval) {
            case 200 : 
                highScoreBoard.style.border = `3px solid green`
            break
            case 150 :
                highScoreBoard.style.border = `3px solid goldenrod`
            break
            case 100 :
                highScoreBoard.style.border = `3px solid red`
            break
            case 60 :
                highScoreBoard.style.border = `3px solid magenta`
            break
        }
    }
    highScoreBoard.innerText = `${highScore}`
}

//end round when snake dies
const killSnake = () => {
    for (let i = 0; i < pixels.length; i++) {
        if (snake.includes(i)) {
            pixels[i].classList.add(`deadSnake`)
        }
    }
    logHighScore()
    clearInterval(timedMovement)
    return gameActive = false
}

//keystroke detection
document.addEventListener(`keydown`, function(event) {
    if (gameActive === true) {
        switch (event.keyCode) {
            case 37 :
                //left arrow
                if (snake[1] !== snake[0] - 1) {direction = -1}
            break
            case 38 :
                //up arrow
                if (snake[1] !== snake[0] - widthInterval) {direction = -widthInterval}
            break
            case 39 :
                //right arrow
                if (snake[1] !== snake[0] + 1) {direction = 1}
            break
            case 40 :
                //down arrow
                if (snake[1] !== snake[0] + widthInterval) {direction = widthInterval}
            break
            case 87 :
                //w
                if (snake[1] !== snake[0] - widthInterval) {direction = -widthInterval}
            break
            case 65 :
                //a
                if (snake[1] !== snake[0] - 1) {direction = -1}
            break
            case 83 :
                //s
                if (snake[1] !== snake[0] + widthInterval) {direction = widthInterval}
            break
            case 68 :
                //d
                if (snake[1] !== snake[0] + 1) {direction = 1}
            break
        }
    }
})

//collision detection (walls, snake, obstacles, apples)
const collisionDetector = () => {
    if (snake[0] < widthInterval && direction === -widthInterval) {
        //top hit
        killSnake()
    }
    if (snake[0] > ((widthInterval * widthInterval) - widthInterval) && direction === widthInterval) {
        //bottom hit
        killSnake()
    }
    if (snake[0] % widthInterval === 0 && direction === -1) {
        //left hit
        killSnake()
    }
    if ((snake[0]+1) % widthInterval === 0 && direction === 1) {
        //right hit
        killSnake()
    }
    if ((pixels[snake[0] + direction].classList.contains(`snake`))) {
        //snake hit
        killSnake()
    }
    if ((pixels[snake[0] + direction].classList.contains(`obst`))) {
        //obstacle hit
        killSnake()
    }
    if ((pixels[snake[0] + direction].classList.contains(`apple`))) {
        //apple hit
        pixels[snake[0] + direction].classList.remove(`apple`)
        score += 10
        scoreBoard.innerText = `${score}`
        snakeSize += 2
        dropApple()
        dropObst()
    }
    if ((pixels[snake[0] + direction].classList.contains(`golden`))) {
        //golden apple hit
        pixels[snake[0] + direction].classList.remove(`golden`)
        score += 100
        scoreBoard.innerText = `${score}`
        snakeSize += 3
    }
}

//Speed buttons
speedButtons.forEach((spdBtn) => {
    spdBtn.addEventListener(`click`, () => {
        if (gameActive === false) {
            speedButtons.forEach((btn) => {
                btn.style.backgroundColor = `gray`
            })
            if (spdBtn.id === `slow`) {
                moveInterval = 200
                spdBtn.style.backgroundColor = `green`
            } else if (spdBtn.id === `avg`) {
                moveInterval = 150
                spdBtn.style.backgroundColor = `goldenrod`
            } else if (spdBtn.id === `fast`) {
                moveInterval = 100
                spdBtn.style.backgroundColor = `red`
            } else if (spdBtn.id === `faster`) {
                spdBtn.style.backgroundColor = `magenta`
                moveInterval = 60
            }
        }
    })
})

//Define timed movement interval
let timedMovement = setInterval(moveFunction, moveInterval)
clearInterval(timedMovement)

//Play button
playButton.addEventListener(`click`, () => {
    if (gameActive === false) {
    gameActive = true
    playButton.style.backgroundColor = `gray`
    resetButton.style.backgroundColor = `red`
    timedMovement = setInterval(moveFunction, moveInterval)
    }
})

//Reset button
resetButton.addEventListener(`click`, () => {
    clearInterval(timedMovement)
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].classList = `pixel`
    }
    gameActive = false
    snake = [435,434,433]
    snakeSize = 3
    direction = 1
    snakeDesignation()
    dropApple()
    score = 0
    scoreBoard.innerText = `${score}`
    resetButton.style.backgroundColor = `gray`
    playButton.style.backgroundColor = `green`
})