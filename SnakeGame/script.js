const playBoardEl = document.querySelector('.play-board');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.high-score');
const controlsEl = document.querySelectorAll('.controls i');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY =0; 
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem('high-score') || 0;
highScoreEl.innerHTML = `High Score: ${highScore}`;

function changingFoodPosition(){
    // changing the food position randomly 
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function handleGameOver(){
    clearInterval(setIntervalId);
    alert('Game Over! Please press the okay...');
    location.reload();
}

function changeDirection(event) {
    // changing the valocity based on key press
  if (event.key === 'ArrowUp' && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  }else if (event.key === 'ArrowDown' && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }else if (event.key === 'ArrowLeft' && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }else if (event.key === 'ArrowRight' && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }
}

controlsEl.forEach((key) => {
   key.addEventListener('click', () => changeDirection({key: key.dataset.key}))
})

function initGame() {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class= "food" style = "grid-area: ${foodY} / ${foodX}"></div>`;
    if (snakeX === foodX && snakeY === foodY){
        changingFoodPosition();
        snakeBody.push([foodX,foodY])// pushing food position to snake body array
        score++
        highScore = score >= highScore ? score: highScore;
        localStorage.setItem('high-score', highScore)
        highScoreEl.innerHTML = `High Score: ${highScore}`;
        scoreEl.innerHTML = `Score: ${score}`;
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    // changing the snake head position based on current valocity
        
    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;
    // checking if the snake head is out of wall if so setting gameover true
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class= "head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // checking if the snake hit it own body if so then game will be over
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
   
    playBoardEl.innerHTML = htmlMarkup;
}
changingFoodPosition();
setIntervalId = setInterval(initGame,125);
document.addEventListener('keydown', (event) => {
    changeDirection(event);
})
