// API URL para obtener pokemones
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";
let pokemons = [];

// Cargar los primeros 10 pokemones
window.onload = () => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      pokemons = data.results;
      displayPokemons(pokemons);
    });
};

// Mostrar los pokemones en la lista
function displayPokemons(pokemons) {
  const pokemonList = document.getElementById("pokemon-list");
  pokemonList.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerText = pokemon.name;
    pokemonCard.onclick = () => showPokemonDetails(pokemon.name);
    pokemonList.appendChild(pokemonCard);
  });
}

// Buscar pokemon por nombre
function searchPokemon() {
  const searchValue = document.getElementById("search").value.toLowerCase();

  if (searchValue === "") return;

  fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      const selectedPokemon = [data];
      displayPokemons(selectedPokemon); // Solo muestra el Pokémon buscado
      showPokemonDetails(selectedPokemon[0].name);
    })
    .catch((error) => {
      alert("Pokémon no encontrado.");
      console.error("Error fetching pokemon:", error);
    });
}

// Mostrar detalles del pokemon
function showPokemonDetails(pokemonName) 


{
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


