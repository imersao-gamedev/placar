(async () => {
  const resultados = await fetch('./vencedores.json').then(res => res.json())
  
  const jogosVencedores = document.querySelectorAll('[data-vencedor]')
  const jogosMaisNovos = document.querySelectorAll('[data-mais-novo]')
  
  carregaJogos('vencedores', jogosVencedores, resultados)
  carregaJogos('maisNovos', jogosMaisNovos, resultados)
})()

const carregaJogos = (categoria, elementos, resultados) => {
  elementos.forEach((jogo, indice) => {
    const dadosJogo = resultados[categoria][indice]
    jogo.appendChild(Jogo(dadosJogo, categoria, indice))
  })
}

const Jogo = ({
  nome, 
  idade,
  colocacao,
  nomeDoJogo,
  lugarDuplicado,
  url
}, categoria, indice) => {
  const jogo = document.createElement('a')
  jogo.classList.add('podio')
  jogo.classList.add(`podio-${colocacao}`)
  jogo.classList.add('vencedor')
  jogo.setAttribute('href', url)
  jogo.setAttribute('target', '_blank')

  const indiceImagem = colocacao ? colocacao : indice

  const imagem = lugarDuplicado ? `${indiceImagem}3` : indiceImagem

  const colocacaoHTML = colocacao ? `    <div class="podio-colocacao colocacao">
      ${colocacao}
    </div> ` : ''

  jogo.innerHTML = 
  `
    <div class="imagem-container">
      <img
        src="./assets/${categoria}/${imagem}.png" 
        alt="imagem do jogo do vencedor" 
        class="vencedor-imagem"
      >
    </div>

    <div class="vencedor-conteudo">
      <h2 class="jogo-titulo">${nomeDoJogo}</h2>
      <p>${nome}</p>
      <p>${idade} anos</p>
    </div>
    
    ${colocacaoHTML}
  `

  return jogo
}

const toggleModal = (codigoModal) => {
  const modal = document.querySelector(`[data-modal="${codigoModal}"]`)
  modal.classList.add('modal-show')
}