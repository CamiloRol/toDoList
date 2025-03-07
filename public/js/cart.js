class Cart {
    constructor(productos, d, contenDestacados, contenDestacados2, secProducts, cartCount) {
        this.d = d
        this.contenDestacados = contenDestacados
        this.contenDestacados2 = contenDestacados2
        this.productos = productos
        this.secProducts = secProducts
        this.carrito = []
        this.cartCount = cartCount
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
                        <button class="btn btn-success agregar-carrito" data-id="${producto.id}" style="position: absolute; bottom: 10px; right: 10px;background-color: lightgreen; color: black;">Comprar</button>
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
        
        const existe = this.carrito.find(item => item.id === producto.id);
        let contar = 0

        contar++
        this.cartCount = cartCount

        if (existe) {
            existe.cantidad += 1;
        } else {
            this.carrito.push({ ...producto, cantidad: 1 });
        }

        this.actualizarCarrito();
    }

    borrarDelCarrito(productoId) {
        this.carrito = this.carrito.filter(item => item.id !== productoId);
        this.actualizarCarrito();
    }

    // Método para actualizar la visualización del carrito
    actualizarCarrito() {
        const contenedorCarrito = this.d.getElementById("resumeCart");
        if (!contenedorCarrito) {
            console.error("Error: No se encontró el contenedor del carrito.");
            return;
        }

        contenedorCarrito.innerHTML = "";

        this.carrito.forEach(producto => {
            const itemCarrito = this.d.createElement("div");
            itemCarrito.classList.add("carrito-item");
            itemCarrito.innerHTML = `
                <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                <button class="btn btn-danger btn-sm borrar-carrito" data-id="${producto.id}">Eliminar</button>
            `;
            contenedorCarrito.appendChild(itemCarrito);
        });

        // Agregar eventos a los botones de eliminar
        this.d.querySelectorAll(".borrar-carrito").forEach(boton => {
            boton.addEventListener("click", (event) => {
                const productoId = parseInt(event.target.dataset.id);
                this.borrarDelCarrito(productoId);
            });
        });
    }
}

export default Cart;