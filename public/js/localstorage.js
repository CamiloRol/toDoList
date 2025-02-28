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
      /* this.genPdf = new jsPDF() */
      this.validar(); // Llamamos a la función al crear la clase
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
  
          // Guardamos los datos en una propiedad de la instancia
          this.datosForm = {
            cliente: this.clienteInput.value,
            producto: this.productoInput.value,
            precio: this.precioInput.value,
            imagen: this.imagenInput.value,
            observacion: this.observacionInput.value,
          };
  
          this.guardarDatos(this.datosForm);
        });
      }
    }
 
    guardarDatos(datos) {
        const listadopedidos = "Pedidos";
        let pedidos = [];
    
        // Extraer datos previos del localStorage
        let pedidosPrevios = JSON.parse(localStorage.getItem(listadopedidos));
    
        // Si hay pedidos previos, los asignamos al array
        if (pedidosPrevios !== null) {
            pedidos = pedidosPrevios;
        }
    
        // Agregar el nuevo pedido al array
        pedidos.push(datos);
    
        // Guardar en localStorage
        localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
    
        alert("Datos guardados con éxito");
    }

    /* exportarInven() {
      this.genPdf.text(this.datosForm, 25, 25)
      this.genPdf.save("invenPearone.pdf")
    } */
    
  }
  
  export default LocalStorage;
  




