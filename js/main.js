const pokemonsList = document.getElementById('pokemonsList');
const buttonLoadMore = document.getElementById('loadMore');
const details = document.getElementById('details');
const maxRecord = 200;
const limit = 8;
let offset = 0;

function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons =[])=> {
        pokemonsList.innerHTML+=pokemons.map((pokemon)=>
          ` 
                <li class="pokemonList ${pokemon.type}">
                    
                    <span class="number">#${pokemon.number}</span>
                    <a href="Pokemon.html" class="buttonName">
                        <span class="nome">${pokemon.name}</span>
                        
                    </a>

                    <div class="details">
                        <ol class="detailsType">
                            ${pokemon.types.map((type)=> `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                        </ol>

                        

                        <img src="${pokemon.photo}" 
                            alt=">${pokemon.name}">
                        
                    </div>
                    
                </li> ` 
            
        ).join('');
        
    })
}

    loadPokemonItens(offset,limit);

    buttonLoadMore.addEventListener('click',() => {

        offset += limit;
        const qtdRecordNextPage = offset + limit;

        if(qtdRecordNextPage>=maxRecord){
            const newLimit = maxRecord - offset;
            loadPokemonItens(offset,newLimit);
            buttonLoadMore.parentElement.removeChild(buttonLoadMore)

        } else{
            loadPokemonItens(offset,limit);
        }
        
    })
    details.addEventListener('click',()=>{
        window.location='Pokemon.html'
    })
    
    
    



 

    
    