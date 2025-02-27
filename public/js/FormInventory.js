class FormInventory {
    constructor() {
    this.producto
    this.productos = productos
    this.fila = document.createElement("tr")
}

validateAnswer() {
    if (nombre.value && cantidad.value && precio.value && proveedor.value && descripcion.value && picProduct.value) {
        this.producto = {
            nombre : nombre.value,
            cantidad : cantidad.value,
            precio : precio.value,
            proveedor : proveedor.value,
            descripcion : descripcion.value,
            picProduct : picProduct.value
        }
        saveData()
    }else {
        alert("Todos los campos son obligatorios")
    }
    console.log(this.producto);
}

saveData(pro) {
    this.productos.push(pro)
    localStorage.setItem("productos", JSON.stringify(this.productos))
    alert("productos guardados con exito")
}

insertData() {
    this.productos.forEach((prod, i) => {
        this.fila.innerHTML = `
            <td>${i+1}</td>
            <td>${pro.nombre}</td>
            <td>${pro.cantidad}</td>
            <td>${pro.precio}</td>
            <td>${pro.proveedor}</td>
            <td>${pro.descripcion}</td>
            <td>${pro.picProduct}</td>
        `
        this.tabla.appendChild(this.fila)
    });
}

}

export default FormInventory