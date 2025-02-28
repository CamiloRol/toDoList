/* Se importan las clases que se usan */
import ToDo from "./ToDo.js";
import LocalStorage from "./localstorage.js";
/* import FormInventory from "./FormInventory.js" */

/* Declaracion de constantes que son componentes del script */
const d = document;
const nameTask = d.getElementById("nameTask")
const createBtn = d.getElementById("createBtn")
const listToDo = d.getElementById("listToDo")
const btnToDo = d.getElementById("btnToDo")
const btnForm = d.getElementById("btnForm")
const toDoSpace = d.getElementById("toDoSpace")
const formSpace = d.getElementById("formSpace")

/* Declaracion de constantes que son instancias de clases, no es necesario cargarla cuando se levanta el dom por que es una varible de por si. hay que leer un poco el codigo para entender su estructura.

importaciones
variables
cargue del dom
y escuchadores de botones

ademas que la constante d es equivalente a document por eso cuando utilice documen mejor utiliza d

*/
const storage = new LocalStorage();
/* const ob1 = new FormInventory() */
const obj = new ToDo(nameTask, listToDo)

toDoSpace.style.display = "none"
formSpace.style.display = "none"

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



btnToDo.addEventListener("click", () => {
    toDoSpace.style.display = toDoSpace.style.display === "none" ? "flex" : "none";
});

btnForm.addEventListener("click", () => {
    formSpace.style.display = formSpace.style.display === "none" ? "flex" : "none";
});

createBtn.addEventListener('click', () => {
    obj.createDo()
})

nameTask.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    obj.createDo()
  }
})


