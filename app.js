let numeroMaximo = 10;
let numeroSecreto = 0;
let intentos = 0;
let intentosMaximos = 3;
let listaNumerosSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Selecciona un número del 1 al ${numeroMaximo}. Tienes ${intentosMaximos} intentos para adivinar.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento("p", `Acertaste, el número secreto era ${numeroSecreto}. Te tomo ${intentos} ${(intentos === 1) ? "intento" : "intentos"}.`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento("p","El número secreto es menor.");
        } else {
            asignarTextoElemento("p","El número secreto es mayor.");
        }
        intentos++;
        if (intentos > intentosMaximos) {
        asignarTextoElemento("p", `Lo siento no acertaste, el número secreto era ${numeroSecreto}.`)
        document.getElementById("reiniciar").removeAttribute("disabled");
        }
        limpiarCaja();   
    }
    return;
}

function limpiarCaja() {
    document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
    let numeroAleatorio = Math.floor(Math.random()*numeroMaximo)+1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento("p","Ya se sortearon todos los numeros");
    } else {
        if (listaNumerosSorteados.includes(numeroAleatorio)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroAleatorio);
            return numeroAleatorio;
        }
    }
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

condicionesIniciales();