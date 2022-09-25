const pokemonContainer = document.querySelector('.pokemon-container')
const spinner = document.querySelector("#spinner")
const more = document.querySelector("#more")

let offset = 1
let limit= 8


more.addEventListener("click",()=>{
    offset+=9
    fetchPokemons(offset, limit)
})


function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res=> res.json())
    .then(data => {
        createPokemon(data)
        spinner.style.display = "none"
    })
}

function fetchPokemons(offset, limit){
    spinner.style.display = "block"
    for (let i= offset; i<=offset + limit; i++){
        if (i > 906){
            alert("Ha llegado al tope de Pokemons")
            break
        }
        fetchPokemon(i)
    }
}


function createPokemon(pokemon) {

    
  
    const flipCard = document.createElement("div");//Contenedor principal
    flipCard.classList.add("flip-card");
  
    const cardContainer = document.createElement("div");//contenedor
    cardContainer.classList.add("card-container");
  
    flipCard.appendChild(cardContainer);
    

    const card = document.createElement("div");//creamos tarjeta
    card.classList.add("pokemon-block");//le agregamos una clase a la tarjeta
  
    const spriteContainer = document.createElement("div");//creamos un sprite que contenga la imagen
    spriteContainer.classList.add("img-container");//contenedor de la imagen
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
  
    spriteContainer.appendChild(sprite);

    //creamos el numero id
  
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;//pasar el id a un hilo y con el padstart que añade 2 ceros al principio porq hay pokemons con 3 digitos
  
    
    //creamos el nombre
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;
  
    card.appendChild(spriteContainer);//imagen
    card.appendChild(number);//numero
    card.appendChild(name);//nombre
  
    const cardBack = document.createElement("div");//la parte de atras de la carta
    cardBack.classList.add("pokemon-block-back");
  
    cardBack.appendChild(progressBars(pokemon.stats));
  
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
  }

  //barras de stats
  
  function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    for (let i = 0; i < 3; i++) {
      const stat = stats[i];
  
      const statPercent = stat.base_stat / 2 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.textContent = stat.stat.name;
  
      const progress = document.createElement("div");
      progress.classList.add("progress");
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("aria-valuenow", stat.base_stat);
      progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 200);
      progressBar.style.width = statPercent;
  
      progressBar.textContent = stat.base_stat;
  
      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);
  
      statsContainer.appendChild(statContainer);
    }
  
    return statsContainer;
  }
  
  function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  
  fetchPokemons(offset, limit);
