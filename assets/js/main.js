
/** CONVERTER HTML  */
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12;
let offset = 0;

// 1, 2, 3 , 4, 5       0 - 5
// 6, 7, 8 , 9, 10      5 - 5
// 11, 12               10 - 5 (remove o botão)

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name"> ${pokemon.name} </span>
        <div class="detail">
          <ol class="types">
          ${pokemon.types.map((type) => `<li class="type"${type}>${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}"
          alt="${pokemon.name}">
        </div>
      </li>
    `).join('')
    pokemonList.innerHTML += newHtml
  })
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  debugger
  const qtdRecordsNextPage = offset + limit

  if( qtdRecordsNextPage >= maxRecords) {
    const newLimit =   maxRecords - offset
    loadPokemonItens(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton) // remover botão
  } else {
   loadPokemonItens(offset, limit)

  }
 
})

