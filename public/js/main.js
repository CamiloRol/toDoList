import ToDo from "./ToDo.js";
import LocalStorage from "./localstorage.js";
import Cart from "./cart.js";
import ResumeCart from "./resumeCart.js";
import {WeatherApp} from "./weatherapp.js";
import {PokeApi} from "./pokeapi.js";

const productos = [
    {id: 1, nombre: "Tomates Frescos", precio:1200, imagen: "/recursos/Tomates.jpg"},
    {id: 2, nombre: "Aguacates Cremosos", precio:3000, imagen: "/recursos/avocado.jpg"},
    {id: 3, nombre: "Piña para la niña", precio:1450, imagen: "/recursos/Piña.jpg"},
    {id: 4, nombre: "Naranjas Jugosas", precio:750, imagen: "/recursos/frutasyverduras.jpeg"},
    {id: 5, nombre: "Sandia", precio:750, imagen: "/recursos/watermelon.jpg"},
    {id: 6, nombre: "Coco", precio:750, imagen: "/recursos/coconut.jpg"},
    {id: 7, nombre: "Pimenton", precio:750, imagen: "/recursos/redpepper.jpg"},
    {id: 8, nombre: "Lechuga", precio:750, imagen: "/recursos/salad.jpg"},
]

const d = document;
const nameTask = d.getElementById("nameTask")
const createBtn = d.getElementById("createBtn")
const listToDo = d.getElementById("listToDo")
const btnToDo = d.getElementById("btnToDo")
const btnForm = d.getElementById("btnForm")
const toDoSpace = d.getElementById("toDoSpace")
const formSpace = d.getElementById("formSpace")
const btnSave = d.getElementById("btnSave")
const clienteInput = d.querySelector(".cliente");
const productoInput = d.querySelector(".producto");
const precioInput = d.querySelector(".precio");
const imagenInput = d.querySelector(".imagen");
const observacionInput = d.querySelector(".observacion");
const btnGuardar = d.querySelector(".btnguardar");
const tabla = d.querySelector("#inventaryCards");
const secProducts = d.getElementById("productsToSell")
const contenDestacados = d.querySelector("#productosDestacados")
const contenDestacados2 = d.querySelector("#productosDestacados2")
const resumeCart = d.getElementById("resumeCart")
const searchBtn = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input');

let fila = d.createElement("div")
let path = window.location.pathname;



const storage = new LocalStorage(clienteInput, productoInput, precioInput, imagenInput, observacionInput, btnGuardar, tabla, d, fila);
const obj = new ToDo(nameTask, listToDo)
const cartToBuy = new ResumeCart()


if (path.includes("index.html")) {
    window.jsPDF = window.jspdf.jsPDF;

    const cart = new Cart(productos, d, contenDestacados, contenDestacados2, secProducts)
    cart.insertProducts()
    storage.validar();  
    storage.mostrarDatos();

    btnSave.addEventListener("click", () => {
        storage.exportarInven()
    })
    
    btnToDo.addEventListener("click", () => {
        toDoSpace.style.display = toDoSpace.style.display === "none" ? "flex" : "none";
    });
    
    btnForm.addEventListener("click", () => {
        formSpace.style.display = formSpace.style.display === "none" ? "grid" : "none";
    });
    
    createBtn.addEventListener('click', () => {
        obj.createDo()
    })

    nameTask.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
          obj.createDo()
        }
      })
} else if (path.includes("pokeApi.html")) {
    const pok = new PokeApi([])
    pok.initPok()    
    
} else if (path.includes("jsonPlaceholder.html")){
    cargarFotos()

    async function cargarFotos() {
        try {
                    let response = await fetch('/api/photos');
                    let fotos = await response.json();
    
                    let gallery = document.getElementById("gallery");
                    gallery.innerHTML = ""; // Limpiar antes de agregar
    
                    fotos.forEach((foto) => {
                        gallery.innerHTML += `
                            <div class="card">
                                <h2>${foto.title}</h2>
                                <img src="${foto.thumbnailUrl}" alt="${foto.title}">
                            </div>
                        `;
                    })
        } catch (error) {
            console.log(error);
        }
    }
}else if (path.includes("openWeather.html")) {

    searchBtn.addEventListener('click', () => {
        if(cityInput.value.trim() != '') {
            updateWeatherInfo(cityInput.value);
            cityInput.value = '';
            cityInput.blur();
        }
        
    });

    cityInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter' &&
            cityInput.value.trim() != ''
        ) {
            updateWeatherInfo(cityInput.value);
            cityInput.value = '';
            cityInput.blur();
        }
    })

    const weatherLink = new WeatherApp(searchBtn)
}

d.addEventListener("click", (event) => {
    let link = event.target.closest("a"); // Busca el <a> más cercano
    if (link && link.getAttribute("href").includes(".html")) {
        event.preventDefault();
        const href = link.getAttribute("href");

        d.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    }
});





