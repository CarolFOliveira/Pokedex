
const pokeApi = {}



function convertPokeApiDetailtoPokemon(pokemonDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    const types=pokemonDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type]=types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo=pokemonDetail.sprites.other.dream_world.front_default
    const abilities = pokemonDetail.abilities.map((abilitySlot)=>abilitySlot.ability.name)
    const [ability] = abilities
    pokemon.ability=ability
    pokemon.experience=pokemonDetail.base_experience
    pokemon.height=pokemonDetail.height
    pokemon.weight=pokemonDetail.weight

    return pokemon
}


pokeApi.getDetails =(pokemon)=>{
    return fetch(pokemon.url)
        .then((response)=>response.json())
        .then((pokemonDetail)=>convertPokeApiDetailtoPokemon(pokemonDetail))
       
}

pokeApi.getPokemons=(offset,limit) => {
    //requisição na api - processamento assíncrono
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    //faça algo
    //tipo de declaração de função especial,arrow function
        .then((response)=>response.json())
    //recebe o retorno do then anterior - funciona de forma encadeada
        .then((jsonBody)=> jsonBody.results)
        .then((pokemons)=>pokemons.map(pokeApi.getDetails))
        
        .then((detailRequest)=> Promise.all(detailRequest))
        



    //executa quando dá erro
        .catch((error)=> console.log(error))

}
//requisição concluida independente do sucesso ou fracasso
    //.finally(function(){console.log('Requisição concluída')





 
