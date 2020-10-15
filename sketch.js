var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground,backgroundImage,Ground;
var foodGroup, obstacleGroup;
var score;
var ground;
var obstacles, food;
var bananas;


function preload(){
    backgroundImage= loadImage("jungle.jpg");
 monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

 
}



function setup() {
  createCanvas(800, 400);

  
  ground=createSprite(0,0,800,400)
ground.addImage("background",backgroundImage);
 ground.velocityX=-4;
 ground.x=ground.width/2;
  console.log(ground.x);
  
    monkey=createSprite(100,350,20,50);
  monkey.addAnimation("running" ,monkey_running)
  monkey.scale=0.1;
    monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
   Ground = createSprite(400,350,800,10);
Ground.visible = false;
 obstacleGroup = new Group(); 
foodGroup= new Group();
  score=0;
}


function draw() {
  background(255);
if(ground.x<200) {
    ground.x=ground.width/2;
  }
  if(Ground.x<0) {
    Ground.x=Ground.width/2;
  }
if(keyDown("space")) {
      monkey.velocityY = -10;
    }
      
    monkey.velocityY = monkey.velocityY + 0.8
      
       monkey.collide(Ground);
      if (foodGroup.isTouching(monkey)){
        score=score+2;
      foodGroup.destroyEach();
        switch(score){
          case 10: monkey.scale=0.12;
            break;
            case 20: monkey.scale=0.14;
            break;
            case 30:monkey.scale=0.16;
            break;
            case 40:monkey.scale=0.18;
            break;
          default: break;  
        }
    }
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale=0.1;
          ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(0);
    }
    


 
      spawnbanana();
      spawnObstacles();
  

drawSprites();
    stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
     
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,330,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
        
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function spawnbanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(125,550);    
    banana.velocityX = -5;

    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

     banana.addImage(bananaImage);
     banana.scale=0.05;

    foodGroup.add(banana);
  }
}
 

