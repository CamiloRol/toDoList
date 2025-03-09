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
function showPokemonDetails(pokemonName) {
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
