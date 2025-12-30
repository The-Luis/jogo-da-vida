//O JOGO da vida
//IMPORTANTE: vai rolar merda quando eu for codar o bagulho do mouse ligar e desligar as paradinhas, vou ter que usar essa coisa aqui: getBoundingClientRect() de acordo com o chat lgtv
let aliveCells = 0;
let deadCells = 0;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

//Ambiente onde O JOGO DA VIDA vai se passar


//tamanho do canvas
canvas.height = 500;
canvas.width = 500;

//estilização do canvas
canvas.id = 'canvas';
canvas.style.position = 'fixed';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
canvas.style.border = 'solid #000 1px';
document.body.appendChild(canvas);

//valores padrão
const cellSize = 10;
const gridSize = 500 / cellSize;

//função que vai desenhar as paradinhas na tela
//OBS: vai travar pra caralho e não vai tankar muitos quadrados
//OBS 2: vai travar é o caralho, descobri como canvas funciona, tá safe, o problema vai ser a lógica das 3 regras da vida, isso sim pode ferrar a poha toda
function draw(x, y) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, 10, 10);
}//x e y DEVEM SER múltiplos de 10


//aqui tem um sistema assincrono que desenha um quadrado todo segundo
setInterval(() => {
    const col = Math.floor(Math.random() * gridSize);
    const row = Math.floor(Math.random() * gridSize);
    let xvalue = col * cellSize;
    let yvalue = row * cellSize;
    draw(xvalue, yvalue);
},100);


//debug
// let ultimoFrame = performance.now();

// function medirFPS() {
//     const agora = performance.now();
//     const delta = agora - ultimoFrame;
//     const fps = 1000 / delta;
//     ultimoFrame = agora;

//     console.log(`FPS aproximado: ${fps.toFixed(1)}`);
//     requestAnimationFrame(medirFPS);
// }

// medirFPS();