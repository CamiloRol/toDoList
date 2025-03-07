import ToDo from "./ToDo.js";
import LocalStorage from "./localstorage.js";
import Cart from "./cart.js";
window.jsPDF = window.jspdf.jsPDF;

const productos = [
    {id: 1, nombre: "Tomates Frescos", precio:1200, imagen: "/recursos/Tomates.jpg"},
    {id: 2, nombre: "Aguacates Cremosos", precio:3000, imagen: "/recursos/avocado.jpg"},
    {id: 3, nombre: "Piña para la niña", precio:1450, imagen: "/recursos/Piña.jpg"},
    {id: 4, nombre: "Naranjas Jugosas", precio:750, imagen: "/recursos/frutasyverduras.jpeg"},
    {id: 5, nombre: "no", precio:750, imagen: "no"},
    {id: 6, nombre: "no", precio:750, imagen: "no"},
    {id: 7, nombre: "no", precio:750, imagen: "no"},
    {id: 8, nombre: "ns", precio:750, imagen: "np"},
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



let fila = d.createElement("div")

const storage = new LocalStorage(clienteInput, productoInput, precioInput, imagenInput, observacionInput, btnGuardar, tabla, d, fila);
const obj = new ToDo(nameTask, listToDo)

window.addEventListener("DOMContentLoaded", () => {
    const cart = new Cart(productos, d, contenDestacados, contenDestacados2, secProducts)
    cart.insertProducts()
    storage.validar();  
    storage.mostrarDatos();
})


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
