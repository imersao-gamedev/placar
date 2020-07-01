(async () => {
  const resultados = await fetch('./vencedores.json')
  console.log(resultados)
})()

const Jogo = (props) => {
  const jogo = document.createElement('div')

  jogo.innerHTML = '<h1>Teste</h1>'

  return jogo
}