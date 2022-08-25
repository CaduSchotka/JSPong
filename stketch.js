//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;


let colidio = false;

///Placar

let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}
//////////////Setup background

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//////////////////MAIN
function draw() {
  background(0);

  //Placar
  marcaPonto();
  incluirPlacar();
  
  //bolinha
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();

  //raquete
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  MovRaquete();
  MovRaqueteOponente(); 
 
  //colisão lib externa
  colisaoMinhaRaqueteBiblioteca(xRaquete,yRaquete);
  colisaoMinhaRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente);
}
/////////////////////////////

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
  }

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}
function verificaColisaoBorda(){
if ((xBolinha+raio > width) || (xBolinha-raio < 0) ) {
    velocidadeXBolinha *= -1;
  }
  if ((yBolinha+raio > height) || (yBolinha-raio < 0) ) {
    velocidadeYBolinha *= -1;
  }  
}

////funções raquete
function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function MovRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function MovRaqueteOponente(){
  //velocidadeYOponente = yBolinha-yRaqueteOponente-raqueteComprimento / 2-30;
  //yRaqueteOponente += velocidadeYOponente;
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  
}

function verificaColisaoRaquete()
{
  if(xBolinha-raio < xRaquete+raqueteComprimento && yBolinha-raio < yRaquete+raqueteAltura && yBolinha+raio > yRaquete+raqueteAltura){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoMinhaRaqueteBiblioteca(x,y){
  colidio = 
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
   
  if(colidio){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

///Placar

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170,28);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente,470,28);
}

function marcaPonto(){
  if (xBolinha > 590){
  meusPontos += 1;
  ponto.play();
  }
  if (xBolinha < 10){
  pontosDoOponente += 1;
    ponto.play();
  }
}
