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

var lives = 3;

//set brick variables
    //Thsi is what the array will hold
var brickRowCount = 3;
var brickColumnCount = 5;
//This will set the CSS parameters for each brick
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//set bricks to an array
    //iterate through the array to create new bricks and used for collision detection
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//event handlers for moving the paddle left or right

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


// "e" for event but can be anything
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

//Create a function for when the ball hits a brick
    //add scoring and win message
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN!");
                        document.location.reload();
                        
                    }
                }
            }
        }
    }
}


//create a score function
var score = 0;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    //param1 is the text to display, param2-3 are the cooridinates
    ctx.fillText("Score: " +score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


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

//create a function to draw the bricks
    //sets the x/y position for each brick
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

    

//create a draw function that works with the canvas parameters to keep the ball in the playing field
    //clearRect cleans up any trails left by redrawing the ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

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
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }

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
    requestAnimationFrame(draw);
}

draw();


