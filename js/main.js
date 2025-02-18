import ToDo from "./ToDo.js";

const nameTask = document.getElementById("nameTask")
const createBtn = document.getElementById("createBtn")
const listToDo = document.getElementById("listToDo")
const obj = new ToDo(nameTask, listToDo)

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach(link => {
        if (link.getAttribute("href").includes(".html")) {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const href = link.getAttribute("href")

                document.body.classList.add("fade-out")
                setTimeout(() => {
                    window.location.href = href
                }, 500)
            })
        }
    })
})

createBtn.addEventListener('click', () => {
    obj.createDo()
})

nameTask.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    obj.createDo()
  }
})