//https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/ used for research on how board generation, snake movement, and hit detection works


//https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript used for learning keystroke input

//https://github.com/CodeExplainedRepo/Snake-JavaScript/blob/master/snake.js .keyCode method for detecting key strokes

//https://tpiros.dev/blog/contains-vs-includes/ information on when to use the ,includes() method and when to use the .contains() method

//https://stackoverflow.com/questions/70268854/why-the-interval-will-become-faster-and-faster-if-i-keep-setting-new-interval discovered .clearInterval





////////////////////////

//basic randome board placement function
// pixels[Math.floor(Math.random()*900)]



//collision detection(walls)
//CD = "current div", the div at snake[0]

//top
//if CD is < widthInterval && direction is -widthInterval

//bottom if CD is > (widthInterval * widthInterval) - widthInterval && direction is widthInterval

//left if (CD % width interval === 0) && direction is - 1

//right if (CD +1) % widthInterval === 0 && direction is 1


//apple placement
//randomly assign position in pixels that are not class of snake



// const dropApple = () => {
//     let validDrops = []
//     for (let i = 0; i < pixels.length; i++) {
//         if (pixels[i].classList.includes(`snake`) === false) {
//         validDrops.push(i)
//         }
//     }
//     pixel[validDrops[Math.floor(Math.random()*validDrops.lengh)]].classList.add(`apple`)
// }

//start/reset button
//starts running move command on a loop (does existing function already create a loop?)
//resets - snake length, snake starting position, score, apple placement (reset all classes except pixels?)