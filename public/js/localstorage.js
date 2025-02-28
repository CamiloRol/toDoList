/* import jsPDF from "/jspdf"; */

class LocalStorage {
  constructor() {
      this.d = document;
      this.clienteInput = this.d.querySelector(".cliente");
      this.productoInput = this.d.querySelector(".producto");
      this.precioInput = this.d.querySelector(".precio");
      this.imagenInput = this.d.querySelector(".imagen");
      this.observacionInput = this.d.querySelector(".observacion");
      this.btnGuardar = this.d.querySelector(".btnguardar");
      this.tabla = this.d.querySelector(".table > tbody");
      
      /* this.genPdf = new jsPDF() */

      this.validar(); // llama esa funcion al crear la clase 
      this.mostrarDatos(); // Muestra los datos guardados que estban guardados al crear la pag 
  }

  validar() {
      if (this.btnGuardar) {
          this.btnGuardar.addEventListener("click", () => {
              if (
                  this.clienteInput.value === "" ||
                  this.productoInput.value === "" ||
                  this.precioInput.value === "" ||
                  this.imagenInput.value === ""
              ) {
                  alert("Todos los campos deben ser rellenados");
                  return;
              }

              // guarda los datos en una propiedad de la instancia
              this.datosForm = {
                  cliente: this.clienteInput.value,
                  producto: this.productoInput.value,
                  precio: this.precioInput.value,
                  imagen: this.imagenInput.value,
                  observacion: this.observacionInput.value,
              };

              this.guardarDatos(this.datosForm);
              this.mostrarDatos(); // Actualiza la tabla luego de guardar
          });
      }
  }

  guardarDatos(datos) {
      const listadopedidos = "Pedidos";
      let pedidos = JSON.parse(localStorage.getItem(listadopedidos)) || [];

      // Agregar el nuevo pedido al array
      pedidos.push(datos);

    //esto guarda en el local
      localStorage.setItem(listadopedidos, JSON.stringify(pedidos));

      alert("Datos guardados con éxito");
  }

  // metodo para extraer los datos guardados en el locals y pega en la tabla
  mostrarDatos() {
      const listadopedidos = "Pedidos";
      let pedidos = JSON.parse(localStorage.getItem(listadopedidos)) || [];

      this.tabla.innerHTML = ""; // limpia la tabla antes de agregar datos nuevos

      pedidos.forEach((p, i) => {
          let fila = this.d.createElement("tr");
          fila.innerHTML = `
              <td>${i + 1}</td>
              <td>${p.cliente}</td>
              <td>${p.producto}</td>
              <td>${p.precio}</td>
              <td><img src="${p.imagen}" width="50%"></td>
              <td>${p.observacion}</td>
              <td><button class="btn-editar btn-primary" data-index="${i}">✏️</button></td>
              <td><button class="btn-eliminar btn-danger" data-index="${i}">🗑️</button></td>
          `;

          this.tabla.appendChild(fila);
      });

      // eventos del boton eliminar y asi editar tambien maracaibo
      this.d.querySelectorAll(".btn-eliminar").forEach(btn => {
          btn.addEventListener("click", (e) => {
              const index = e.target.getAttribute("data-index");
              this.eliminarPedido(index);
          });
      });

      this.d.querySelectorAll(".btn-editar").forEach(btn => {
          btn.addEventListener("click", (e) => {
              const index = e.target.getAttribute("data-index");
              this.editarPedido(index);
          });
      });
  }

  // metodo para eliminar un pedido
  eliminarPedido(index) {
      const listadopedidos = "Pedidos";
      let pedidos = JSON.parse(localStorage.getItem(listadopedidos)) || [];
      
      pedidos.splice(index, 1); // Elimina el pedido en la posición "index"
      
      localStorage.setItem(listadopedidos, JSON.stringify(pedidos)); // Guarda la nueva lista
      
      this.mostrarDatos(); // Actualiza la tabla
  }

  // metodo para editar un pedido (se puede mejorar)
  editarPedido(index) {
      const listadopedidos = "Pedidos";
      let pedidos = JSON.parse(localStorage.getItem(listadopedidos)) || [];

      let pedido = pedidos[index];

      // Cargar los datos en los inputs
      this.clienteInput.value = pedido.cliente;
      this.productoInput.value = pedido.producto;
      this.precioInput.value = pedido.precio;
      this.imagenInput.value = pedido.imagen;
      this.observacionInput.value = pedido.observacion;

      // Eliminar el pedido antiguo y actualizar localStorage
      this.eliminarPedido(index);
  }

  /* exportarInven() {
      this.genPdf.text(this.datosForm, 25, 25)
      this.genPdf.save("invenPearone.pdf")
  } */
}

export default LocalStorage;





