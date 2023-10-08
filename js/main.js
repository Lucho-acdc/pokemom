let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 600;
let timerInicial = 600;
let tiempoRegresivoId = null;

let winAudio = new Audio("./sonidos/win.wav");
let loseAudio = new Audio("./sonidos/lose.wav");
let clickAudio = new Audio("./sonidos/click.wav");
let rightAudio = new Audio("./sonidos/right.wav");
let wrongAudio = new Audio("./sonidos/wrong.wav");

let mostrarAciertos = document.getElementById("aciertos");
let mostrarMovimientos = document.getElementById("tiempoRestante");
let mostrarTiempo = document.getElementById("movimientos");

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]; // Números del 1 al 8, cada uno repetido dos veces

// Revolver el arreglo de números para los otros botones
numeros = numeros.sort(() => {
    return Math.random() - 0.5;
});

contarTiempo = () => {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if (timer === 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            // audios
        }
    }, 1500);
}

bloquearTarjetas = () => {
    for (let i = 0; i < 16; i++) {
        let tarjetaBloqueada = document.getElementById(i + 1);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png">`;
        tarjetaBloqueada.disabled = true;
    }
}

destapar = (e) => {
    const buttonId = e.target.id;
    if (temporizador === false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;

    if (tarjetasDestapadas === 1) {
        tarjeta1 = e.target;
        primerResultado = numeros[buttonId - 1];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png">`;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = e.target;
        segundoResultado = numeros[buttonId - 1];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png">`;
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarMovimientos.innerHTML = `El total de movimientos fue: ${movimientos}`;
                mostrarTiempo.innerHTML = `Genial, lo resolviste en: ${timerInicial - timer} segundos`;
            }
        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = "";
                tarjeta2.innerHTML = "";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 700);
        } 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', destapar);
    });
});
