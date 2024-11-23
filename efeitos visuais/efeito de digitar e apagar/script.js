const frases = ["Frase 1", "Frase 2", "Frase 3"];
const textoFixo = "Texto fixo";
let indiceFrase = 0;
let indiceLetra = 0;
let indiceLetraFixo = 0;
let apagando = false;
const elementoTextoLinha1 = document.getElementById("linha1");
const elementoTextoLinha2 = document.getElementById("linha2");
const cursorLinha1 = document.getElementById("blinking-cursor1");
const cursorLinha2 = document.getElementById("blinking-cursor2");
const promptIcon1 = document.getElementById("prompt-icon1");
const promptIcon2 = document.getElementById("prompt-icon2");
const velocidadeDigitar = 100;
const velocidadeApagar = 50;
const tempoEntreFrases = 2000;

function digitarLinha1() {
    if (indiceLetraFixo < textoFixo.length) {
        elementoTextoLinha1.textContent += textoFixo.charAt(indiceLetraFixo);
        indiceLetraFixo++;
        setTimeout(digitarLinha1, velocidadeDigitar);
    } else {
        cursorLinha1.style.display = "none";
        cursorLinha2.style.display = "inline";
        setTimeout(digitarLinha2, velocidadeDigitar);
    }
}

function digitarLinha2() {
    if (!apagando && indiceLetra < frases[indiceFrase].length) {
        elementoTextoLinha2.textContent += frases[indiceFrase].charAt(indiceLetra);
        indiceLetra++;
        setTimeout(digitarLinha2, velocidadeDigitar);
    } else if (apagando && indiceLetra > 0) {
        elementoTextoLinha2.textContent = frases[indiceFrase].substring(0, indiceLetra - 1);
        indiceLetra--;
        setTimeout(digitarLinha2, velocidadeApagar);
    } else if (!apagando && indiceLetra === frases[indiceFrase].length) {
        setTimeout(() => {
            apagando = true;
            setTimeout(digitarLinha2, velocidadeApagar);
        }, tempoEntreFrases);
    } else if (apagando && indiceLetra === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        setTimeout(digitarLinha2, velocidadeDigitar);
    }
}

function mudarCorPrompt() {
    const cores = ['#00ff00', '#ff0000', '#0000ff'];
    const corAtual = promptIcon1.style.color;
    const novaCor = cores[(cores.indexOf(corAtual) + 1) % cores.length];
    promptIcon1.style.color = novaCor;
    promptIcon2.style.color = novaCor;
}

promptIcon1.addEventListener('click', mudarCorPrompt);
promptIcon2.addEventListener('click', mudarCorPrompt);

cursorLinha2.style.display = "none";
digitarLinha1();
