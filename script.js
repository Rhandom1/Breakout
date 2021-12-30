var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set canvas parameters
var x= canvas.width/2
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//set var for the radius of the ball
var ballRadius = 10;

//Set variable for drawing the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) /2;

//set variables for contorlling the paddle
var pressRight = false;
var pressLeft = false;

var interval = setInterval(draw, 10);

//create a function that redraws the ball
    //setInterval controls the speed the ball is redrawn or moves
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//create a function to control the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    
}

//create a draw function that works with the canvas parameters to keep the ball in the playing field
    //clearRect cleans up any trails left by redrawing the ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
    }

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //add paddle collision factors
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    

    if(pressRight) {
        paddleX += 10;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(pressLeft) {
        paddleX -= 10;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    

    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        pressRight = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        pressLeft = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        pressRight = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        pressLeft = false;
    }
}
