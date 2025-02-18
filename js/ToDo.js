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
            completar.addEventListener('click', this.remarkDo);
        
            let eliminar = document.createElement('i');
            eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
            eliminar.addEventListener('click', this.deleteDo);

            let editar = document.createElement('i');
            editar.classList.add('bi', 'bi-pencil-fill', 'icono-editar'); 
            editar.addEventListener('click', (e) => this.editDo(e));
        
            iconos.append(completar, eliminar, editar);
        
            // Agregar la tarea a la lista.
            listToDo.appendChild(tareaNueva);
        } else {
            alert('Por favor ingresa una tarea.');
        }
    }

    reviewDo() {

    }

    deleteDo(e) {
        let task = e.target.parentNode.parentNode;
        task.remove();
    }

    editDo(e) {
        let task = e.target.closest('.task'); 
        let texto = task.querySelector('p'); 

        // Crear un input para edición
        let inputEdicion = document.createElement('input');
        inputEdicion.type = 'text';
        inputEdicion.value = texto.innerText;
        inputEdicion.classList.add('input-editar');

        // Reemplazar el texto con el input
        task.replaceChild(inputEdicion, texto);

        // Guardar cambios al presionar Enter
        inputEdicion.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && inputEdicion.value.trim() !== '') {
                texto.innerText = inputEdicion.value;
                task.replaceChild(texto, inputEdicion);
            }
        });

        // Si el input pierde el foco, restaurar el texto
        inputEdicion.addEventListener('blur', () => {
            texto.innerText = inputEdicion.value;
            task.replaceChild(texto, inputEdicion);
        });

        // Colocar el foco en el input
        inputEdicion.focus();
    }

    remarkDo(e) {
        let task = e.target.parentNode.parentNode;
        task.classList.toggle('completada');
    }
}

export default ToDo