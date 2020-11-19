var PLAY = 0;
var END = 1;
var gamestate = PLAY;


var climber, climberImage;
var ghost, ghostImage;
var sppokysound; //just to irritate you
var tower, towerImage;
var door, doorImage;
var doorGroup;
var climberGroup;
var invisble, invisbleBlocGroup;

function preload() {
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  sppokysound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  ghost = createSprite(200, 200, 50, 50)
  tower.addImage(towerImage);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlocGroup = new Group();
}

function draw() {
  background(0);
  if (gamestate === PLAY) {
    spawnDoors();

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 20;
    }
    if (keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 20;
    }
    tower.velocityY = 3;
    if (tower.y > windowHeight / 1) {
      tower.y = tower.width / 2;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlocGroup.isTouching(ghost) || ghost.y > windowHeight) {
      ghost.destroy();
      gamestate=END;
    }
  
  drawSprites();
}
if(gamestate===END){
  stroke("cyan");
  fill("yellow");
  textSize(30);
  text("Game Over",windowHeight/2,windowWidth/2);
}
}
function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50,20,20);
    door.x=Math.round(random(120,400));
    door.addImage(doorImage);
    door.velocityY=1;
    door.lifetime=windowHeight/1;
    doorGroup.add(door);
    
    climber=createSprite(door.x,door.y+70,20,20);
    climber.addImage(climberImage);
    climber.velocityY=1;
    climber.lifetime=windowHeight/1;
    climberGroup.add(climber);
    
    invisible=createSprite(door.x,door.y+80,50,2);
    invisible.velocityY=1;
    invisible.lifetime=windowHeight/1;
    invisibleBlocGroup.add(invisible);
    
    ghost.depth=door.depth+1;
    invisible.debug=true;
  }
}