var canvas;
var cenario, form;
var database;
var gameState = 0;
var carimg1, carimg2;
var pista, player;
var car1, car2;
var cars = [];
var playerCount = 0;
var allPlayers;
var coinImg, fuelImg, obsImg1, obsImg2, heartImg, blastImg, loseImg, winImg, explosionImg,noFuelImg
var coins, fuel, obs


function preload() {
  cenario = loadImage("planodefundo.png");
  pista = loadImage("pista.png");
  carimg1 = loadImage("car1.png");
  carimg2 = loadImage("car2.png");
  coinImg=loadImage ("coin.webp")
  fuelImg=loadImage ("mushroom.webp")
  obsImg1=loadImage ("banana.webp")
  obsImg2=loadImage("shell.webp")
  heartImg=loadImage("heart.png")
  blastImg=loadImage("blast.png")
  loseImg=loadImage("lose.gif")
  winImg=loadImage("win.png")
  explosionImg=loadImage("explosion.gif")
  noFuelImg=loadImage("nofuel.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  //criar o objeto game da classe game
  game = new Game();
  game.start();
  //pega o estado de jogo
  game.getState();
}

function draw() {
  background(cenario);
  //checa se há dois jogadores
  if(playerCount == 2){
    //atualiza o valor do BD
    game.updateState(1);
  }

  if(gameState == 1){
    game.play();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
