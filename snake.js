const playBoard = document.querySelector(".game-box");
const scoreEle = document.querySelector(".score");
const details = document.querySelector(".details");
const highScoreEle = document.querySelector(".high-score");

let gameOver = false ;
let setIntValid;

let highScore = localStorage.getItem("high-score") || 0 ;
highScoreEle.innerText = `High-Score : ${highScore}`;

let score = 0;
 let snakeBody = [];
let foodx = 13 , foody = 10;
let snakex = 5 , snakey = 20;
let velocityX = 0 , velocityY = 0;

function handleGameOver(setIntValid){
  clearInterval(setIntValid); 
  alert("You Died Press Ok For Restart and wait....");
  location.reload();
   
}

const changePosition = () => {
    foodx = Math.floor(Math.random()*30)+1;
    foody = Math.floor(Math.random()*30)+1;
}

const changeDirection = (e)=> {

 if(e.key === "ArrowUp" && velocityY!= 1){
    velocityX = 0;
    velocityY = -1;
 }
 else if (e.key === "ArrowDown" && velocityY!=-1){
    velocityX = 0;
    velocityY = 1 ;
 }
 else if (e.key === "ArrowRight" && velocityX!= -1){
    velocityX = 1;
    velocityY = 0 ;
 }
 else if (e.key === "ArrowLeft" && velocityX!=1){
    velocityX = -1;
    velocityY = 0 ;
 }
 
}

const initGame = () =>{
if(gameOver) return handleGameOver();
let htmlMarkup = `<div class="food" style="grid-area:${foody} / ${foodx}"></div>`;
//htmlMarkup += `<div class="head" style="grid-area:${snakey} / ${snakex}"></div>`;

if(snakex === foodx && snakey === foody){
    changePosition();
   snakeBody.push([foodx , foody]);
   console.log(snakeBody);
   score++;
 
   highScore = score >= highScore ? score : highScore ;
localStorage.setItem("high-score",highScore);

scoreEle.innerText = `Score : ${score}`;

highScoreEle.innerText = `High-Score : ${highScore}`;

}

 for(let i=snakeBody.length-1 ;i>0 ; i--){
    snakeBody[i]=snakeBody[i-1];
 }

snakeBody[0] = [snakex , snakey];

    snakex += velocityX;
    snakey += velocityY;

if(snakex <= 0 || snakex > 30 || snakey <= 0 ||snakey > 30  ){

   gameOver = true ;

}


for(let i=0; i<snakeBody.length ;i++){

    htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
   
    if(i!==0 && snakeBody[0][1] === snakeBody[i][1] &&  snakeBody[0][0] === snakeBody[i][0]){
      gameOver = true;
    }
}

playBoard.innerHTML = htmlMarkup;
}

changePosition();
setIntValid = setInterval(initGame, 125);

document.addEventListener("keydown",changeDirection);