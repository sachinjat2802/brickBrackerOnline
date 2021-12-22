let canvas = document.getElementById("myCanvas"); // referrencing canvas element into variable
let ctx = canvas.getContext("2d");
// ctx variable used to store the 2d rendering context on canvas 

//ball variables 
let x = canvas.width/2 
let y = canvas.height - 30
let dx = -2 
let dy = -2 
let ballRadius = 10; 
let color = get_random_color(); 
//defining paddle to hit the ball 
let paddleHeight = 10; 
let paddleWidth = 85; 
let paddleX = (canvas.width - paddleWidth) /2 ; 

// score 
let score = 0; 

//brick variables
let brickRowCount = 7; 
let brickColumnCount = 7; 
let brickWidth = 50;
let brickHeight = 10; 
let brickPadding = 10; 
let brickOffsetTop = 30; 
let brickOffsetLeft = 30;

var bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}


let rightPressed = false; 
let leftPressed = false; 
 
//random color for ball 

document.addEventListener("keydown", keyDownHandler, false); // when keydown is fired ( any key is pressed down ) keydownhandler() will be executed. 
document.addEventListener("keyup", keyUpHandler, false); 


 function get_random_color() {
    let letters = 'ABCDEF1234567890'.split(''); // ['A','B','C'..]
    let color = "#";
    for (var i =0;i<3;i++) {
        color += letters[Math.floor(Math.random() * letters.length)] + Math.floor(Math.random() * 10);
        
    }
    return color 
}

function keyDownHandler(e) {
    if (e.keyCode == 39) { // 39 is right cursor key, 37 is left cursor key
    rightPressed = true }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) { 
    leftPressed = false ;}
}

function collisionDetection(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            let b = bricks[c][r]
            if( b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                dy= -dy; 
                 
                b.status = 0
                score++; 
                if (score === brickColumnCount*brickRowCount) {
                    alert("YOU WIN, CONGRATS")
                    let z = confirm("Play again?")
                    if (z) {
                        document.location.reload()
                    }
                    else {
                        alert("Thank you for playing! Press the reload button if you want to start again.")
           x=canvas.width/2; y=canvas.height/2; dy=0; dx=0;
          paddleX = (canvas.width - paddleWidth) /2 ;
            
            window.stop()
                    }
                }
            }
        }
    }
    
}
}


function drawBall() {
    ctx.beginPath();
ctx.arc(x,y,ballRadius,0,Math.PI*2); 
    ctx.fillStyle =color; 
    ctx.fill(); 
    ctx.closePath();    
}

function drawPaddle() { 
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height - paddleHeight, paddleWidth, paddleHeight  );
    ctx.fillStyle= color; 
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
 for ( c = 0; c<brickColumnCount; c++){
     for(r =0; r<brickRowCount; r++){
         if (bricks[c][r].status === 1) { 
             
        let brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
         let brickY = (r* (brickHeight + brickPadding)) + brickOffsetTop;
         
         bricks[c][r].x = brickX; 
         bricks[c][r].y = brickY;
         // saves the x and y dimensions of each brick into an object. 
         
         ctx.beginPath();
         ctx.rect(brickX,brickY,brickWidth,brickHeight);
         ctx.fillStyle = color; 
         ctx.fill();
         ctx.closePath();
     }
 }
} 
}
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle =color;
    ctx.fillText("Score: " + score, 8,20);
}
function draw() {
ctx.clearRect(0,0,canvas.width,canvas.height); 

drawBricks();
drawBall(); 
drawPaddle();
drawScore(); 
collisionDetection();


x+=dx; 
y+=dy; 
    

if (x + dx < ballRadius || x + dx > canvas.width ) {
    dx = -dx
   color = get_random_color();
}
    
if (y + dy < ballRadius ) {
    dy = -dy // account for when the ball touches the wall, not the center of the ball
    color = get_random_color();
}
    
else if ( y + dy > canvas.height- ballRadius) { 
    
     if( x >= paddleX - ballRadius && x <= paddleX + paddleWidth) {
        
         dy = -1.05 * dy   ;
         
        
     }
    else  { 
    
    let r = alert(`Game over! Final score: ${score} Press 'Start' to restart`) 
     
     
            dx= 0; dy = 0; 
           document.location.reload()
            ; 
      
        
        
        
    }
}


    
if (rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 5; 
}
else if (leftPressed && paddleX > 0) {
    paddleX -= 5; 
}
}


 
