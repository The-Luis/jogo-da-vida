const winPatterns = [

    // HORIZONTAIS (15)
    [0,1,2], [1,2,3], [2,3,4],
    [5,6,7], [6,7,8], [7,8,9],
    [10,11,12], [11,12,13], [12,13,14],
    [15,16,17], [16,17,18], [17,18,19],
    [20,21,22], [21,22,23], [22,23,24],

    // VERTICAIS (15)
    [0,5,10], [5,10,15], [10,15,20],
    [1,6,11], [6,11,16], [11,16,21],
    [2,7,12], [7,12,17], [12,17,22],
    [3,8,13], [8,13,18], [13,18,23],
    [4,9,14], [9,14,19], [14,19,24],

    // DIAGONAIS ↘ (8)
    [0,6,12],
    [1,7,13],
    [2,8,14],

    [5,11,17],
    [6,12,18],

    [10,16,22],
    [11,17,23],

    [12,18,24],

    // DIAGONAIS ↙ (8)
    [2,6,10],
    [3,7,11],
    [4,8,12],

    [8,12,16],
    [9,13,17],

    [12,16,20],
    [13,17,21],

    [14,18,22]
];
function verificarVencedor(){
    const elementos = document.querySelectorAll('.tac');
    
    return winPatterns.some(padrao => {
        const [pos1, pos2, pos3] = padrao;
        const val = elementos[pos1].dataset.toe;
        
        return val !== 'none' && 
               elementos[pos2].dataset.toe === val && 
               elementos[pos3].dataset.toe === val;
    });
}
function jogar() {
    let turno = 1;
    let vencedor = false;

    document.querySelectorAll('.tac').forEach(el => {
        el.addEventListener('click', function () {
            if (vencedor) return;
            
            el.style.textAlign = 'center';
            el.style.fontSize = '6rem';

            if (el.dataset.toe === 'none') {
                if (turno === 1) {
                    const x = document.createElement('span');
                    x.textContent = 'X';
                    el.appendChild(x);
                    el.dataset.toe = 'xTurn';
                    turno = 2;
                } else {
                    const o = document.createElement('span');
                    o.textContent = 'O';
                    el.appendChild(o);
                    el.dataset.toe = 'oTurn';
                    turno = 1;
                }
                
                if (verificarVencedor()) {
                    const jogador = turno === 1 ? 'O' : 'X';
                    document.getElementById('result').textContent = `Jogador ${jogador} Venceu!`;
                    vencedor = true;
                }
            }
        });
    });
}

document.getElementById('startBtn').addEventListener('click', jogar);