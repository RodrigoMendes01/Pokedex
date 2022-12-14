/*********Elementos HTML*******************/
const nomePokemon = document.querySelector('.pokemon__name')
const idPokemon = document.querySelector('.pokemon__id')
const imagemPokemon = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const inputPesquisa = document.querySelector('.input__search')
const botaoAnterior = document.querySelector('.btn-prev')
const botaoProximo = document.querySelector('.btn-next')

/*********Primeiro Pokemon*******************/
let primeiroPokemon = 1;

/*********Buscar pokemon na API***********************/
const encontrarPokemon = async  (pokemon) => {
    const pokemonEncontrado = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (pokemonEncontrado.status === 200) {
      const data = await pokemonEncontrado.json()
      return data
    }
}
/********Renderizar dados do pokemon no html com DOM*************/
const renderizarNaView = async (pokemon) => {
  nomePokemon.innerHTML = "Carregando..."
  idPokemon.innerHTML = ''

  const data = await encontrarPokemon(pokemon)
  
  if (data) {
    imagemPokemon.style.display ='block'
    nomePokemon.innerHTML = data.name
    idPokemon.innerHTML = data.id
    imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    primeiroPokemon = data.id
  } else {
    nomePokemon.innerHTML = "Não encontrado"
    idPokemon.innerHTML = ''
    imagemPokemon.style.display = 'none'
  }

}
/*********Eventos*******************************/
/***Formulário***/
form.addEventListener('submit', (event) => {
  event.preventDefault();

  renderizarNaView(inputPesquisa.value.toLowerCase())
  inputPesquisa.value = ''
})
/*****Botão de voltar******/
botaoAnterior.addEventListener('click', () => {
  if (primeiroPokemon > 1) {
    primeiroPokemon -= 1
    renderizarNaView(primeiroPokemon)
  }
})
/****Botão de próximo****/
botaoProximo.addEventListener('click', () => {
  primeiroPokemon += 1
  renderizarNaView(primeiroPokemon)
})
/***********Inicar view com um pokemon padrão********/
renderizarNaView(primeiroPokemon)
