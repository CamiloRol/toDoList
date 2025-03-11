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

      pokemonDetails.innerHTML = ""; // limpia el contenido que estaba antesito
      pokemonDetails.style.display = "block"; // Mostrar la sección de los detalles
      // esto crea la tarjeta
      const card = document.createElement("div");
      card.classList.add("card", "shadow-lg", "rounded", "text-center", "bg-light", "p-3");
      card.style.width = "18rem";

      // eto pone la img del pokemon 
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      img.alt = data.name;
      img.classList.add("card-img-top", "mx-auto");
      img.style.width = "150px";

      // esto es basicamente lo que esta dentro de la tarjeta tipo el cuerpo
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const title = document.createElement("h2");
      title.classList.add("card-title", "text-capitalize");
      title.textContent = data.name;

      const height = document.createElement("p");
      height.classList.add("card-text");
      height.innerHTML = `<strong>Altura:</strong> ${data.height / 10} m`;

      const weight = document.createElement("p");
      weight.classList.add("card-text");
      weight.innerHTML = `<strong>Peso:</strong> ${data.weight / 10} kg`;

      const abilities = document.createElement("p");
      abilities.classList.add("card-text");
      abilities.innerHTML = `<strong>Habilidades:</strong> ${data.abilities.map((ability) => ability.ability.name).join(", ")}`;

      // agrega los elementos al cuerpo de la tarjeta
      cardBody.appendChild(title);
      cardBody.appendChild(height);
      cardBody.appendChild(weight);
      cardBody.appendChild(abilities);

      // agrega la imagen y cuerpo a la tarjeta
      card.appendChild(img);
      card.appendChild(cardBody);

      // agrega la tarjeta al contenedor
      pokemonDetails.appendChild(card);
    })
    .catch((error) => {
      console.error("Error fetching Pokémon details:", error);
      document.getElementById("pokemon-details").innerHTML = "<p class='text-danger'>Pokémon no encontrado.</p>";
    });
  }
}

