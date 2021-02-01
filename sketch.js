var ball;
var db, ballPosition;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    db = firebase.database();
    ballPosition = db.ref("Ball");
    ballPosition.on("value", readPosition, showError);

    // var data = {
    //     Ball : {
    //         X : 200,
    //         Y : 400
    //     }
    // }
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    // ball.x = ball.x + x;
    // ball.y = ball.y + y;

    ballPosition.set({
        X : ball.x + x,
        Y : ball.y + y
    });

}

function readPosition(data) {
    var position = data.val();
    ball.x = position.X;
    ball.y = position.Y;
}

function showError(errorMsg) {
    console.log(errorMsg);
}
