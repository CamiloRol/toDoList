const { jsPDF } = window.jspdf;

class LocalStorage {
  constructor(clienteInput, productoInput, precioInput, imagenInput, observacionInput, btnGuardar, tabla, d, secProducts, fila) {
      this.clienteInput = clienteInput
      this.productoInput = productoInput
      this.precioInput = precioInput
      this.imagenInput = imagenInput
      this.observacionInput = observacionInput
      this.btnGuardar = btnGuardar
      this.tabla = tabla
      this.d = d
      this.secProducts = secProducts
      this.fila = fila
      this.jsPDF = new jsPDF();
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
              this.mostrarDatos(); 
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
          this.fila.innerHTML = `
              <div class="card" style="width: 18rem;">
                <img src="${p.imagen}" class="card-img-top" alt="producto ${i + 1}">
                <div class="card-body">
                  <h5 class="card-title">${i + 1} ${p.producto}</h5>
                  <p class="card-text">${p.observacion} a un precio de ${p.precio} al proveedor ${p.cliente}</p>
                  <button class="btn-editar btn-primary" data-index="${i}">✏️</button>
                  <button class="btn-eliminar btn-danger" data-index="${i}">🗑️</button>
                </div>
              </div>
          `;

          this.tabla.appendChild(this.fila)
          this.secProducts.appendChild(this.fila)
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

  exportarInven() {
    const listadopedidos = "Pedidos";
    let pedidos = JSON.parse(localStorage.getItem(listadopedidos)) || [];

    if (pedidos.length === 0) {
        alert("No hay pedidos para exportar");
        return;
    }
    let y = 20;
    this.jsPDF.setFontSize(16);
    this.jsPDF.text("Inventario de Pearone", 10, 10);
    this.jsPDF.setFontSize(12);

    pedidos.forEach((pedido, index) => {
        this.jsPDF.text(`Pedido ${index + 1}`, 10, y);
        y += 10;
        Object.entries(pedido).forEach(([key, value]) => {
            this.jsPDF.text(`${key}: ${value}`, 10, y);
            y += 10;
        });
        y += 10;
    });

    this.jsPDF.save("invenPearone.pdf");
}
}

export default LocalStorage;





