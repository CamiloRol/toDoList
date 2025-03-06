class Cart {
    constructor(productos, d, contenDestacados, contenDestacados2) {
        this.d = d
        this.contenDestacados = contenDestacados
        this.contenDestacados2 = contenDestacados2
        this.productos = productos
    }

   insertProducts() {
    const productosDestacados = this.productos.slice(0, 4)
    let i = 0

    do {
        if (i == 0) {
            productosDestacados.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("carousel-item", "active");
                div.innerHTML = `
                    <div class="card" style="width: 14rem;">
                        <img src=${producto.imagen} class="card-img-top" alt=${producto.name} style="height: 150px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">${producto.id}</h5>
                                <p class="card-text">${producto.name}</p>
                                <p class="card-text">${producto.precio}</p>
                                <a href="#" class="btn btn-success" style="position: absolute; bottom: 10px; right: 10px;">Shop Now</a>
                            </div>
                    </div>
                `;
                this.contenDestacados.appendChild(div);
            })
        }else {
            productosDestacados.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("carousel-item", "active");
                div.innerHTML = `
                    <div class="card" style="width: 14rem;">
                        <img src=${producto.imagen} class="card-img-top" alt=${producto.name} style="height: 150px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">${producto.id}</h5>
                                <p class="card-text">${producto.name}</p>
                                <p class="card-text">${producto.precio}</p>
                                <a href="#" class="btn btn-success" style="position: absolute; bottom: 10px; right: 10px;">Shop Now</a>
                            </div>
                    </div>
                `;
                this.contenDestacados2.appendChild(div);
            })
        }
        i++

    } while (i<2)
    
   } 
}

export default Cart;