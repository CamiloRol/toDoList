import ToDo from "./ToDo.js";
import LocalStorage from "./localstorage.js";
import Cart from "./cart.js";
import ResumeCart from "./resumeCart.js";
import contactUs from "./contactenos.js"; //Esta parte no supe hacerla
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
const clienteInput = d.querySelector(".cliente")
const productoInput = d.querySelector(".producto")
const precioInput = d.querySelector(".precio")
const imagenInput = d.querySelector(".imagen")
const observacionInput = d.querySelector(".observacion")
const btnGuardar = d.querySelector(".btnguardar")
const tabla = d.querySelector("#inventaryCards")
const secProducts = d.getElementById("productsToSell")
const contenDestacados = d.querySelector("#productosDestacados")
const contenDestacados2 = d.querySelector("#productosDestacados2")
const resumeCart = d.getElementById("resumeCart")
const searchBtn = d.querySelector('.search-btn')
const cityInput = d.querySelector('.city-input')
const loginForm = d.getElementById("loginForm")
const emailLogin = d.getElementById("emailLogin").value
const passLogin = d.getElementById("passLogin").value
const BtnContactenos = d.querySelector(".contactanos-btn");


let fila = d.createElement("div")
let path = window.location.pathname;



const storage = new LocalStorage(clienteInput, productoInput, precioInput, imagenInput, observacionInput, btnGuardar, tabla, d, fila);
const obj = new ToDo(nameTask, listToDo)
const cartToBuy = new ResumeCart() 


if (path.includes("index.html")){
    window.jsPDF = window.jspdf.jsPDF;

    const cart = new Cart(productos, d, contenDestacados, contenDestacados2, secProducts)
    cart.insertProducts()
    storage.validar();  
    storage.mostrarDatos();

    btnSave.addEventListener("click", () => {
        storage.exportarInven();
        imagenInput.style.display = (imagenInput.style.display === "none" ) ? "grid" : "none";
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

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        try {
            const responseLogin = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({emailLogin, passLogin})
            })

            const data = await responseLogin.json()
            if (responseLogin.ok) {
                localStorage.setItem("token", data.token)
                alert("Login exitoso")
                /* window.location.href = "debe ir la pagina del index.html pero ocultando el formulario de login y trayendo el nombre completo del cliente" */
            }else {
                alert(data.message)
            }
        } catch (error) {
            console.error("Error en login:", error)
        }
    })  
} else if (path.includes("pokeApi.html")) {
    const pok = new PokeApi([])
    pok.initPok()    
    
} else if (path.includes("jsonPlaceholder.html")){
    const btnSearch = d.getElementById("btnSearch")
    const galleryDiv = document.getElementById("gallery")

    btnSearch.addEventListener("click", () => {
        buscarImagenes()
        galleryDiv.style.display = "grid"
    })

    async function buscarImagenes() {   
        let query = document.getElementById("searchQuery").value || "nature";

        try {
            let response = await fetch(`/api/galeria?query=${query}`);
            let data = await response.json();

            galleryDiv.innerHTML = ""; // Limpiar galería
    
            data.gallery.forEach(url => {
                let img = document.createElement("img");
                img.src = url;
                img.classList.add("gallery-img"); // esto lo toca isra y es paara  agregar el css 
                galleryDiv.appendChild(img);
            });
        } catch (error) {
            console.error("Error al obtener imágenes:", error);
        }
    }
}else if (path.includes("openWeather.html")) {
    const weatherLink = new WeatherApp()
    
    searchBtn.addEventListener('click', () => {
        if(cityInput.value.trim() != '') {
            weatherLink.updateWeatherInfo(cityInput.value);
            cityInput.value = '';
            cityInput.blur();
        }
    });

    cityInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter' &&
            cityInput.value.trim() != ''
        ) {
            weatherLink.updateWeatherInfo(cityInput.value);
            cityInput.value = '';
            cityInput.blur();
        }
    })
}else if(path.includes("contactUs.html")) {
    BtnContactenos.addEventListener("click", 
        GuardarLocalStorage()
    );
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





