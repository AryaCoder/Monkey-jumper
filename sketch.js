
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime,ground,ivGround,PLAY=1,END=0,gamestate=PLAY;

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")                         
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)

 
  monkey = createSprite(30,380,10,10)
  monkey.addAnimation("running",monkey_running)  
  monkey.scale=0.12

   obstacleGroup=createGroup() 
   FoodGroup=createGroup()
 // obstacle.y=390
  ground=createSprite(200,395,800,10)
 
monkey.setCollider("rectangle",0,0,250,550)
  survivalTime= 0 
 
}
 

function draw() {
  
  background("green")
  textSize(14)
  stroke(0)
  fill(0)
  text("Survival Time="+survivalTime,300,20) 
 
 
  //monkey.debug=true
 monkey.collide(ground)
  
  if(gamestate===PLAY) {
 ground.velocityX=-(6+2*survivalTime/100)
    
    survivalTime=
  survivalTime+Math.round(getFrameRate()/60);
  
  if(ground.x>0){
   ground.x=ground.width/2
  }
 
  
  if(keyDown("space")&&monkey.y>350){
    monkey.velocityY=-23
  }
  monkey.velocityY=monkey.velocityY+1
  
   if(obstacleGroup.isTouching(monkey)){
     gamestate=END
   }
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach()
    survivalTime= survivalTime+20
  }
    
    bananas() 
  obstacles()
  
  }else if(gamestate===END){
    monkey.velocityY=0
    ground.velocityX=0;
   obstacleGroup.setVelocityXEach(0)
   obstacleGroup.setLifetimeEach(-1)
   FoodGroup.setVelocityXEach(0)
   FoodGroup.setLifetimeEach(0)
   monkey.pause()    
   reset()
  text("Press Space to restart",200,200)
  }
  //console.log(monkey.y)
  
  
  
  
  
  

  drawSprites();
 
}

function obstacles(){
  
  
   if(frameCount%100===0){
   obstacle=createSprite(600,350,10,10)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.22   
  obstacle.velocityX=ground.velocityX
   obstacle.lifetime=120
  // obstacle.debug=true
    obstacle.setCollider("circle",0,80,250)
     obstacleGroup.add(obstacle) 
    monkey.depth=obstacle.depth
     monkey.depth=monkey.depth+1
   }
    
}


function bananas(){

  if(frameCount%80===0){
   
  banana =                            createSprite(600,Math.round(random(120,200)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-(6+2*survivalTime/50)
  banana.lifetime=100
  FoodGroup.add(banana) 
  }
  
  
  
}
function reset(){
  
  
  
  if(keyDown("space")){
    obstacleGroup.destroyEach()
    survivalTime=0
  gamestate=PLAY 
  monkey.play();
  }
}


