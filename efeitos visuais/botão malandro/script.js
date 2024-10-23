function fugaDoBotao() {
    const botaoNao = document.getElementById("nao")

    var comprimentoJanela = window.innerWidth;
    var alturaJanela = window.innerHeight;

    var posicaoHorizontal = comprimentoJanela - botaoNao.offsetWidth;
    var posicaoVertical= alturaJanela - botaoNao.offsetHeight;

    var coordenadaX = Math.floor(Math.random() * posicaoHorizontal)
    var coordenadaY =  Math.floor(Math.random() * posicaoVertical)

    botaoNao.style.left = coordenadaX + 'px';
    botaoNao.style.top = coordenadaY + 'px';
}
