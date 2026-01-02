// O JOGO da vida
// IMPORTANTE: vai rolar merda quando eu for codar o bagulho do mouse ligar e desligar as paradinhas,
// vou ter que usar essa coisa aqui: getBoundingClientRect() de acordo com o chat lgtv
// let aliveCells = 0;
// let deadCells = 0;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// tamanho do canvas
canvas.height = 500;
canvas.width = 500;

// estilização do canvas
canvas.id = 'canvas';
canvas.style.position = 'fixed';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
canvas.style.border = 'solid #000 1px';
document.body.appendChild(canvas);

// valores padrão
const cellSize = 10;
const gridSize = 500 / cellSize;

// essa função recebe x e y e desenha um quadrado preto nessas mesmas posições em um plano cartesiano
function draw(posX, posY) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(posX, posY, cellSize, cellSize);
}

// essa função itera sobre todas as células e pintar as cujo valor for 1
function pintar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    linhas.forEach((linha, i) => {
        linha.forEach((celula, j) => {
            if (celula === 1) {
                draw(j * cellSize, i * cellSize);
            }
        });
    });
}

// cria uma grade de 0s
let linhas = [];
for (let i = 0; i < gridSize; i++) {
    let linha = [];
    for (let j = 0; j < gridSize; j++) {
        linha.push(0);
    }
    linhas.push(linha);
}

// conta os vizinhos vivos de uma célula
function contarVizinhos(col, row) {
    let vizinhos = 0;

    for (let desH = -1; desH <= 1; desH++) {
        for (let desV = -1; desV <= 1; desV++) {
            if (desH === 0 && desV === 0) continue;

            const newCol = col + desH;
            const newRow = row + desV;

            // sistema para lidar com bordas
            if (
                newRow >= 0 && newRow < linhas.length &&
                newCol >= 0 && newCol < linhas[0].length
            ) {
                if (linhas[newRow][newCol] === 1) {
                    vizinhos++;
                }
            }
        }
    }

    return vizinhos;
}

// aplica as regras do jogo da vida
function aplicarRegras(estadoAtual, vizinhos) {
    if (estadoAtual === 1 && vizinhos < 2) return 0;     // solidão
    if (estadoAtual === 1 && vizinhos > 3) return 0;     // superpopulação
    if (estadoAtual === 0 && vizinhos === 3) return 1;   // nascer
    return estadoAtual;                                  // sobrevive
}

// gera a próxima geração
function proximaGeracao() {
    let novaGrade = [];

    for (let i = 0; i < linhas.length; i++) {
        let novaLinha = [];

        for (let j = 0; j < linhas[i].length; j++) {
            const vizinhos = contarVizinhos(j, i);
            const novoEstado = aplicarRegras(linhas[i][j], vizinhos);
            novaLinha.push(novoEstado);
        }

        novaGrade.push(novaLinha);
    }

    linhas = novaGrade;
}

// EXEMPLO: ligar algumas células manualmente
// glider
// linhas[10][11] = 1;
// linhas[11][12] = 1;
// linhas[12][10] = 1;
// linhas[12][11] = 1;
// linhas[12][12] = 1;

// linhas[5][5] = 1;
// linhas[5][6] = 1;
// linhas[6][5] = 1;
// linhas[6][6] = 1;

// linhas[10][10] = 1;
// linhas[10][11] = 1;
// linhas[10][12] = 1;

// linhas[15][16] = 1;
// linhas[15][17] = 1;
// linhas[15][18] = 1;
// linhas[16][15] = 1;
// linhas[16][16] = 1;
// linhas[16][17] = 1;

// linhas[20][20] = 1;
// linhas[20][21] = 1;
// linhas[21][20] = 1;

// linhas[22][23] = 1;
// linhas[23][22] = 1;
// linhas[23][23] = 1;

linhas[40 - 24][41 - 24] = 1;
linhas[40 - 24][44 - 24] = 1;
linhas[41 - 24][45 - 24] = 1;
linhas[42 - 24][41 - 24] = 1;
linhas[42 - 24][45 - 24] = 1;
linhas[43 - 24][42 - 24] = 1;
linhas[43 - 24][43 - 24] = 1;
linhas[43 - 24][44 - 24] = 1;
linhas[43 - 24][45 - 24] = 1;


// loop simples
setInterval(() => {
    proximaGeracao();
    pintar();
}, 100);
