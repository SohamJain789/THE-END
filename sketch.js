//Global Variables
var fruit,banana_image,backgroundImg;
var obstacle,rock,player,playerImg;
var rand,bananaG,obstacleG,count;
var invGround,PLAY,END,gameState;

function preload(){
  
banana_image = loadImage("banana.png");
backgroundImg = loadImage("jungle.jpg");
playerImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
rock = loadImage("stone.png");
}


function setup() {
  createCanvas(displayWidth-20,displayHeight-30);

  PLAY = 1
  END = 0
  gameState = PLAY;
  player = createSprite(displayWidth/4-120,displayHeight/4,20,20);
  player.addAnimation("player",playerImg);
  player.scale = 0.195;

 invGround = createSprite(0,displayHeight-70,2800,10)
 invGround.visible = false;

  bananaG = new Group();
  obstacleG = new Group();

   count = 0;

  //banana = createSprite(200,200,30,20)
  //banana.addImage(banana_image);
  //banana.scale = 0.1;
  //player = createSprite(0,)
}


function draw(){
 background(backgroundImg,displayWidth+20,displayHeight+30);
 stroke("white")
 textSize(20);
 fill("white");
 text("Score:"+ count,500,50);
 console.log(gameState);
 player.collide(invGround);
 if(gameState === PLAY){
 if (invGround.x > 25) {
    invGround.x = invGround.width/2;
  }

   if (keyDown("space") && player.y > 500) {
    player.velocityY = -8; 
   }

   player.velocityY = player.velocityY + 0.2;

 obstacles();
 banana();

  count = count + Math.round(World.frameRate/32);
   
   text("Your survival time:" + count,player.x+150,400);
   
   if (player.isTouching(bananaG)) {
     
     bananaG.destroyEach();
     count = count + 5;
     player.scale = player.scale + 0.09;
     
   }
   
  if (player.isTouching(obstacleG)) {
     
    player.scale = 0.13;
    obstacle.destroy();
}

switch(count){
      case 10: player.scale = 0.2
               break;
      case 20: player.scale = 0.26
               break;
      case 30: player.scale = 0.32
               break;                  
     case 40: player.scale = 0.38
               break;
          default:break;       
}

if(player.isTouching(obstacleG) && player.scale === 0.13){

gameState = END;

}

}     else if (gameState === END ) {
    
      ground.velocityX = 0;
      obstacleG.destroyEach();
      bananaG.destroyEach();
      obstacleG.destroyEach();
      //player.destroy();
      text("Game over",200,200);
      text("press R to restart",200,300);
      count = 0;
       }
camera.position.x=player.x;
camera.position.y=player.y;

 drawSprites(); 
}

function obstacles(){
if (World.frameCount % 300 === 0) {
  
obstacle = createSprite(1400,displayHeight-100,10,10);
obstacle.addAnimation("rock",rock);
obstacle.scale = 0.15;
obstacle.velocityX = -4;
obstacle.lifetime = 1400;
obstacle.collide(invGround);

obstacleG.add(obstacle);
  
}
}

function banana() {
if (World.frameCount % 310 === 0) {
rand =random(displayHeight-350,displayHeight-400)
fruit = createSprite(1400,rand,10,10);
fruit.addAnimation("banana",banana_image);
fruit.scale = 0.1;
fruit.velocityX = -4;
fruit.lifetime = 1400;

bananaG.add(fruit);
}}
