import ToDo from "./ToDo.js";
import LocalStorage from "./localstorage.js";


const d = document;
const nameTask = d.getElementById("nameTask")
const createBtn = d.getElementById("createBtn")
const listToDo = d.getElementById("listToDo")
const btnToDo = d.getElementById("btnToDo")
const btnForm = d.getElementById("btnForm")
const toDoSpace = d.getElementById("toDoSpace")
const formSpace = d.getElementById("formSpace")
const btnSave = d.getElementById("btnSave")

const storage = new LocalStorage();
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


