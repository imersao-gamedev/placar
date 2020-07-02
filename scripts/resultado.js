(async () => {
  const resultados = await fetch('./vencedores.json').then(res => res.json())
  
  const jogosVencedores = document.querySelectorAll('[data-vencedor]')
  const jogosMaisNovos = document.querySelectorAll('[data-mais-novo]')
  const jogosHomenagens = document.querySelectorAll('[data-homenagem]')
  const mencoesContainer = document.querySelector('[data-mencoes]')
  const mencoes = shuffleArray(resultados.mencoesHonrosas)

  carregaJogos('vencedores', jogosVencedores, resultados)
  carregaJogos('maisNovos', jogosMaisNovos, resultados)
  carregaJogos('homenagens', jogosHomenagens, resultados)
  carregaMencoes(mencoesContainer, mencoes)

})()

const carregaJogos = (categoria, elementos, resultados) => {
  elementos.forEach((jogo, indice) => {
    const dadosJogo = resultados[categoria][indice]
    jogo.appendChild(Jogo(dadosJogo, categoria, indice))
  })
}

const carregaMencoes = (container, mencoes) => {
  mencoes.forEach(mencao => {
    const Mencao = document.createElement('div')
    Mencao.appendChild(Jogo(mencao, 'mencoesHonrosas', mencao.imagem))
    container.appendChild(Mencao)
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

     <div class="conteudo">
       <p>${nome}</p>
       <p>${idade} anos</p>
     </div>
    </div>
    
    ${colocacaoHTML}
  `

  return jogo
}

const shuffleArray = (array) => {
  const novoArray = array.slice()
  for (let i = novoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = novoArray[i]
    novoArray[i] = novoArray[j]
    novoArray[j] = temp
  }

  return novoArray
}
