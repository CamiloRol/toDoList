class LocalStorage {
    constructor() {
      this.d = document;
      this.clienteInput = this.d.querySelector(".cliente");
      this.productoInput = this.d.querySelector(".producto");
      this.precioInput = this.d.querySelector(".precio");
      this.imagenInput = this.d.querySelector(".imagen");
      this.observacionInput = this.d.querySelector(".observacion");
      this.btnGuardar = this.d.querySelector(".btnguardar");
  
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
        let pedidos = [];
        
      localStorage.setItem("pedidos", JSON.stringify(datos)); // Guardamos en localStorage como JSON
      alert("Datos guardados con éxito");
    }
  }
  
  export default LocalStorage;
  




