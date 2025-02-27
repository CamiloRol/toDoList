import ToDo from "./ToDo.js";
/* import FormInventory from "./FormInventory.js" */

const d = document
const nameTask = d.getElementById("nameTask")
const createBtn = d.getElementById("createBtn")
const listToDo = d.getElementById("listToDo")
const btnToDo = d.getElementById("btnToDo")
const btnForm = d.getElementById("btnForm")
const toDoSpace = d.getElementById("toDoSpace")
const formSpace = d.getElementById("formSpace")

/* const ob1 = new FormInventory() */
const obj = new ToDo(nameTask, listToDo)

toDoSpace.style.display = "none"
formSpace.style.display = "none"

d.addEventListener("DOMContentLoaded", () => {
    d.querySelectorAll("a").forEach(link => {
        if (link.getAttribute("href").includes(".html")) {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const href = link.getAttribute("href")

                d.body.classList.add("fade-out")
                setTimeout(() => {
                    window.location.href = href
                }, 500)
            })
        }
    })
})


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


import localStorage from "./localstorage.js";
