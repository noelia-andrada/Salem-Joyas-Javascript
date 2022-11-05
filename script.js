const contenedorProductos = document.getElementById("contenedorProductos");

const localJson = "json/productos.json";

fetch(localJson)
.then (respuesta => respuesta.json())
.then (datos => {
	datos.forEach((producto) => {
		const card = document.createElement("div");
		card.classList.add("col-xl-3","col-md-6","col-xs-12");
		card.innerHTML= `<div class="card">
							<img src= "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}"
							<div class="card-body">
								<h3 class="card-title"> ${producto.nombre} </h3>
								<p class="card-text"> $${producto.precio} </p>
								<p class="card-text"> ${producto.descripcion} </p>
								<button class="btn colorBoton" id="boton ${producto.id}"> Agregar al carrito </button>
							</div>
						</div>`
	})

		contenedorProductos.appendChild(card);
})