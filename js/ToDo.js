class ToDo {
    constructor(nameTask, priority, listToDo) {
        this.name = nameTask
        this.priority = priority
        this.listToDo = listToDo
    }

    createDo() {
        if (nameTask.value) {
            let tareaNueva = document.createElement('div')
            tareaNueva.classList.add('task')

            let texto = document.createElement('p')
            texto.innerText = nameTask.value
            tareaNueva.appendChild(texto);
  
            // Crear y agregar contenedor de los iconos
            let iconos = document.createElement('div');
            iconos.classList.add('icono'); 
            tareaNueva.appendChild(iconos);
        
            // Crear y agregar iconos.
            let completar = document.createElement('i');
            completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
            completar.addEventListener('click', this.reviewDo);
        
            let eliminar = document.createElement('i');
            eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
            eliminar.addEventListener('click', this.deleteDo);
        
            iconos.append(completar, eliminar);
        
            // Agregar la tarea a la lista.
            listToDo.appendChild(tareaNueva);
        } else {
            alert('Por favor ingresa una tarea.');
        }
    }

    reviewDo(e) {
        let task = e.target.parentNode.parentNode;
        task.classList.toggle('completada');
    }

    deleteDo(e) {
        let task = e.target.parentNode.parentNode;
        task.remove();
    }

    editDo() {
        
    }

    remarkDo() {
        
    }
}

export default ToDo