const frases = ["Frase 1", "Frase 2", "Frase 3"];
let indiceFrase = 0;
let indiceLetra = 0;
let apagando = false;
const elementoTexto = document.getElementById("texto");
const velocidadeDigitar = 100;
const velocidadeApagar = 50;
const tempoEntreFrases = 2000;

function digitar() {
    if (!apagando && indiceLetra < frases[indiceFrase].length) {
        elementoTexto.textContent += frases[indiceFrase].charAt(indiceLetra);
        indiceLetra++;
        setTimeout(digitar, velocidadeDigitar);
    } else if (apagando && indiceLetra > 0) {
        elementoTexto.textContent = frases[indiceFrase].substring(0, indiceLetra - 1);
        indiceLetra--;
        setTimeout(digitar, velocidadeApagar);
    } else if (!apagando && indiceLetra === frases[indiceFrase].length) {
        setTimeout(() => {
            apagando = true;
            setTimeout(digitar, velocidadeApagar);
        }, tempoEntreFrases);
    } else if (apagando && indiceLetra === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        setTimeout(digitar, velocidadeDigitar);
    }
}

digitar();
