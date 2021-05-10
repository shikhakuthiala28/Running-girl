var bgImg,canvas;
var girl,girlImg,girl_jumpImg,girl_fallImg,ground,stone,stoneImg,banana,bananaImg,stoneGroup,bananaGroup;
var invisible_ground,fruits,fruitGroup,fruit1_Img,fruit2_Img,fruit3_Img,fruit4_Img,fruit5_Img;
var score=0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
    bgImg=loadImage("BG2.jpg");
    girlImg=loadAnimation("G1.png","G2.png","G3.png","G4.png","G5.png","G6.png");
    stoneImg=loadImage("R1.png");
    bananaImg=loadImage("B1.png");
    girl_fallImg=loadAnimation("F1.png");
    girl_jumpImg=loadAnimation("J1.png");
    fruit1_Img=loadImage("A1.png");
    fruit2_Img=loadImage("M1.png");
    fruit3_Img=loadImage("O1.png");
    fruit4_Img=loadImage("S1.png");
    fruit5_Img=loadImage("Gr1.png");
}

function setup(){
   canvas=createCanvas(1600,600);
  
   ground=createSprite(800,300,3200,600);
   ground.addImage(bgImg);
   ground.velocityX=-5;

   girl=createSprite(85,400,50,50);
   girl.addAnimation("run",girlImg);
   girl.addAnimation("jump",girl_jumpImg);
   girl.scale=0.75;
   girl.addAnimation("fall",girl_fallImg);
   girl.debug=true;
   girl.setCollider("rectangle",0,0,90,150);

   invisible_ground=createSprite(320,400,3200,20);
   invisible_ground.visible=false;

   stoneGroup=new Group();
   bananaGroup=new Group();
   fruitGroup=new Group();
   
}
   
function draw(){
    background("white");
    
    if(ground.x<0){
        ground.x=ground.width/2;
    }
    var rand=Math.round(random(1,2));
    if(rand===1){
        spawnstone();
    }
    else if(rand===2){
        spawnbanana();
    }
    
    if(keyDown(UP_ARROW)&& girl.y>300){
        girl.velocityY=-12;
    }
    girl.velocityY=girl.velocityY + 0.6;
    girl.collide(invisible_ground);
    
    if(keyWentDown(UP_ARROW)){
        girl.changeAnimation("jump",girl_jumpImg);
        girl.scale=0.9;
    }
    if(keyWentUp(UP_ARROW)){
        girl.changeAnimation("run",girlImg);
        girl.scale=0.75;
    }
    
    if(stoneGroup.isTouching(girl)|| bananaGroup.isTouching(girl) ){
        girl.changeAnimation("fall",girl_fallImg);
        stoneGroup.setVelocityXEach(0);
        ground.velocityX=0;
        bananaGroup.setVelocityXEach(0);
        fruitGroup.setVelocityEach(0);
    }

    if(fruitGroup.isTouching(girl)){

        fruitGroup.destroyEach();
        score=score+5;
    }

    spawnfruits();

    drawSprites();
    fill("green");
    textSize(20);
    text("SCORE:" + score,1300,50);
    
    }

function spawnstone(){
    if(frameCount%200===0){
        stone=createSprite(1000,425,50,50);
        stone.addImage(stoneImg);
        stone.velocityX=-5;
        stone.debug=true;
        stone.setCollider("rectangle",0,0,115,90);
        stone.lifetime=300;
        stoneGroup.add(stone);

    }
}

function spawnbanana(){
    if(frameCount%200===0){
        banana=createSprite(1500,440,50,50);
        banana.addImage(bananaImg);
        banana.velocityX=-5;
        banana.scale=0.12;
        banana.debug=true;
        banana.setCollider("circle",0,0,90)
        banana.lifetime=300;
        bananaGroup.add(banana);
    }
}

function spawnfruits(){
    if(frameCount%200===0){
        fruits = createSprite(random(1000, 1500), 150, 100, 100);
        fruits.velocityX =-6;
       
        var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_Img);
                fruits.scale=0.3;
                break;
                case 2: fruits.addImage("fruit1", fruit2_Img);
                fruits.scale=0.3;
                break;
                case 3: fruits.addImage("fruit1", fruit3_Img);
                fruits.scale=0.3;
                break;
                case 4: fruits.addImage("fruit1", fruit4_Img);
                fruits.scale=0.09;
                break;
                case 5: fruits.addImage("fruit1", fruit5_Img);
                fruits.scale=0.3;
                break;
            }
            fruitGroup.add(fruits);
        

    }
}