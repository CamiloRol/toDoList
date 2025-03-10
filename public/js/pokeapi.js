export class PokeApi {
  constructor() {
    this.pokemonList = document.getElementById("pokemon-list");
    this.searchValue = document.getElementById("search").value.toLowerCase();
    this.pokemons = []
    this.apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10"
  }

  initPok() {
    fetch(this.apiUrl)
          .then((response) => response.json())
          .then((data) => {
            this.pokemons = data.results;
            this.displayPokemons();
          });
  }

  displayPokemons() {

    this.pokemonList.innerHTML = "";
  
    this.pokemons.forEach((pokemon) => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");
      pokemonCard.innerText = pokemon.name;
      pokemonCard.onclick = () => this.showPokemonDetails(pokemon.name);
      this.pokemonList.appendChild(pokemonCard);
    });
  }

  searchPokemon() {
    
    if (this.searchValue === "") return;
  
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        const selectedPokemon = [data];
        this.displayPokemons(selectedPokemon); // Solo muestra el Pokémon buscado
        this.showPokemonDetails(selectedPokemon[0].name);
      })
      .catch((error) => {
        alert("Pokémon no encontrado.");
        console.error("Error fetching pokemon:", error);
      });
  }

  showPokemonDetails(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonDetails = document.getElementById("pokemon-details");
        pokemonDetails.style.display = "block"; // Mostrar la sección de detalles
        pokemonDetails.innerHTML = `
          <h2>${data.name}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <p><strong>Altura:</strong> ${data.height}</p>
          <p><strong>Peso:</strong> ${data.weight}</p>
          <p><strong>Habilidades:</strong> ${data.abilities
            .map((ability) => ability.ability.name)
            .join(", ")}</p>
        `;
      })
      .catch((error) => {
        console.error("Error fetching pokemon details:", error);
      });
  }
}

