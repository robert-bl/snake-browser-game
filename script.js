
let board = document.querySelector(`#board`)
let scoreBoard = document.querySelector(`#score`)
let playButton = document.querySelector(`#play`)
let snakePixels = document.querySelectorAll(`.snake`)
let gameActive = false
let resetButton = document.querySelector(`#reset`)
let redApple = document.querySelector(`.apple`)
let highScoreBoard = document.querySelector(`#highScore`)
let speedButtons = document.querySelectorAll(`.speed`)
let slowButton = document.querySelector(`#slow`)
let avgButton = document.querySelector(`#avg`)
let fastButton = document.querySelector(`#fast`)
let fasterButton = document.querySelector(`#faster`)
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


//detecting outer pixels
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
console.log(edges)


//define score and scoreboard
let score = 0
let highScore = 0
scoreBoard.innerText = `${score}`
highScoreBoard.innerText = `${highScore}`

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
    for (let i = 0; i < 3; i++) {
        inPath.push(snake[0] + (direction*i))
        // console.log(inPath)
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
    console.log(moveInterval)
    if (gameActive === true) {
        collisionDetector()
    }
    if (gameActive === true) {
        snake.unshift(snake[0] + direction)
        while (snake.length > snakeSize) {snake.pop()}
        snakeDesignation()
        // console.log(`snake is divs ${snake}`)
        detectConstriction()
    }
}


const killSnake = () => {
    console.log(`kill snake`)
    for (let i = 0; i < pixels.length; i++) {
        if (snake.includes(i)) {
            pixels[i].classList.add(`deadSnake`)
        }
    }
}


//keystroke detection
document.addEventListener(`keydown`, function(event) {
    if (gameActive === true) {
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
    }
}
})


//collision detection(walls)
const collisionDetector = () => {
//top hit
    if (snake[0] < widthInterval && direction === -widthInterval) {
        console.log(`wall hit top`)
        killSnake()
        clearInterval(timedMovement)
        return gameActive = false
    }
//bottom hit
    if (snake[0] > ((widthInterval * widthInterval) - widthInterval) && direction === widthInterval) {
        console.log(`wall hit bottom`)
        killSnake()
        clearInterval(timedMovement)
        return gameActive = false
    }
//left hit
    if (snake[0] % widthInterval === 0 && direction === -1) {
        console.log(`wall hit left`)
        killSnake()
        clearInterval(timedMovement)
        return gameActive = false
    }
//right hit
    if ((snake[0]+1) % widthInterval === 0 && direction === 1) {
        console.log(`wall hit right`)
        killSnake()
        clearInterval(timedMovement)
        return gameActive = false
    }
//snake hit
    if ((pixels[snake[0] + direction].classList.contains(`snake`))) {
        console.log(`snake hit`)
        killSnake()
        clearInterval(timedMovement)
        return gameActive = false
    }
//obstacle hit
    if ((pixels[snake[0] + direction].classList.contains(`obst`))) {
        console.log(`obstacle hit`)
        clearInterval(timedMovement)
        killSnake()
        return gameActive = false
    }
//apple hit
    if ((pixels[snake[0] + direction].classList.contains(`apple`))) {
        pixels[snake[0] + direction].classList.remove(`apple`)
        // pixels[snake[0] + direction].classList.add(`hitClassRed`)
        //give points
        score += 10
        //doubled with score definiths, consider simplifying
        scoreBoard.innerText = `${score}`
        snakeSize += 2
        dropApple()
        dropObst()
    }
//golden apple hit
    if ((pixels[snake[0] + direction].classList.contains(`golden`))) {
        pixels[snake[0] + direction].classList.remove(`golden`)
        // pixels[snake[0] + direction].classList.add(`hitClassGold`)
        score += 100
        scoreBoard.innerText = `${score}`
        snakeSize += 3
    }
}

console.log(speedButtons)

speedButtons.forEach((spdBtn) => {
    console.log(spdBtn)
    spdBtn.addEventListener(`click`, () => {
        if (gameActive === false) {
            console.log(`ping`)
            if (spdBtn.id == `slow`) {
                moveInterval = 200
            } else if (spdBtn.id == `avg`) {
                moveInterval = 150
            } else if (spdBtn.id == `fast`) {
                moveInterval = 100
            } else if (spdBtn.id == `faster`) {
                moveInterval = 60
            }
            speedButtons.forEach((btn) => {
                btn.style.backgroundColor = `gray`
            })
            spdBtn.style.backgroundColor = `green`
        }
    })
})

let timedMovement = setInterval(moveFunction, moveInterval)
clearInterval(timedMovement)

// const runGame = () => {
//     timedMovement = setInterval(moveFunction, moveInterval)
// }

playButton.addEventListener(`click`, () => {
    if (gameActive === false) {
    gameActive = true
    playButton.style.backgroundColor = `gray`
    resetButton.style.backgroundColor = `red`
    timedMovement = setInterval(moveFunction, moveInterval)
    // runGame()
    }
})


resetButton.addEventListener(`click`, () => {
    clearInterval(timedMovement)
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].classList = `pixel`
    }
    gameActive = false
    snake = [435,434,433]
    snakeSize = 3
    snakeDesignation()
    direction = 1
    dropApple()
    if (score > highScore) {
        highScore = score
    }
    highScoreBoard.innerText = `${highScore}`
    score = 0
    scoreBoard.innerText = `${score}`
    resetButton.style.backgroundColor = `gray`
    playButton.style.backgroundColor = `green`
})

