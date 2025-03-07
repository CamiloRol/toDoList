class Cart {
    constructor(productos, d, contenDestacados, contenDestacados2, secProducts) {
        this.d = d
        this.contenDestacados = contenDestacados
        this.contenDestacados2 = contenDestacados2
        this.productos = productos
        this.secProducts = secProducts
    }

    insertProducts() {
    const contenedor1 = document.getElementById("productosDestacados");
    const contenedor2 = document.getElementById("productosDestacados2");

    contenedor1.innerHTML = ""; 
    contenedor2.innerHTML = "";

    const grupo1 = this.productos.slice(0, 4);
    const grupo2 = this.productos.slice(4, 8);

    const crearTarjetas = (productos, contenedor) => {
        const row = document.createElement("div");
        row.classList.add("row");

        productos.forEach((producto) => {
            const col = document.createElement("div");
            col.classList.add("col-3");

            col.innerHTML = `
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <button class="btn btn-success agregar-carrito" data-id="${producto.id}" style="position: absolute; bottom: 10px; right: 10px;">Comprar</button>
                    </div>
                </div>
            `;

            row.appendChild(col);
        });

        contenedor.appendChild(row);

        row.querySelectorAll(".agregar-carrito").forEach((boton) => {
            boton.addEventListener("click", (event) => {
                const productoId = parseInt(event.target.dataset.id);
                const productoSeleccionado = this.productos.find(p => p.id === productoId);
                if (productoSeleccionado) {
                    this.agregarAlCarrito(productoSeleccionado);
                }
            });
        });
    };

    crearTarjetas(grupo1, contenedor1);
    crearTarjetas(grupo2, contenedor2);
    }

    agregarAlCarrito(producto) {
        console.log("Producto agregado al carrito:", producto);
    }
      
}

export default Cart;