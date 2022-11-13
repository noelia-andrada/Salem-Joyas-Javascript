const contenedorProductos = document.getElementById("contenedorProductos");
const eleccionJoyeria = document.getElementById("eleccionJoyeria");
const btnBuscarJoyeria = document.getElementById("btnBuscarJoyeria");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
const actualizarCarrito = document.getElementById("actualizarCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const botonFinCompra = document.getElementById("botonFinCompra");
const toggles = document.querySelectorAll(".toggles");
const precioFinal = document.getElementById("precioFinal");
const finCompra = document.getElementById("finCompra");
const totalConDescuento = document.getElementById("totalDescuentoId");

let carrito = [];

//Búsqueda de productos por categorías.

function filtrarProducto(array) {
    let valor = eleccionJoyeria.value;
    if (valor.length > 1) {
		return array.filter((producto) => producto.categoria == valor);
    } else {
        return array;
    }
}

function crearHTML(array) {
    contenedorProductos.innerHTML = "";
    array.forEach((producto) => {
		const tarjeta = document.createElement("div");
		tarjeta.classList.add("col-xl-3","col-md-6","col-xs-12");
		tarjeta.innerHTML= `<div class="card">
								<img src= "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}"
								<div class="card-body">
									<h3 class="card-title"> ${producto.nombre} </h3>
									<p class="card-text"> $${producto.precio} </p>
									<p class="card-text"> ${producto.descripcion} </p>
									<button class="btn colorBoton" id="boton ${producto.id}"> Agregar al carrito </button>
								</div>
							</div>`
		contenedorProductos.appendChild(tarjeta);

		const boton = document.getElementById(`boton ${producto.id}`);

		boton.addEventListener("click", ()=>{
			Toastify({
				text: "Agregado al carrito",
				className: "carrito",
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				}
			}).showToast();

			agregarAlCarrito(producto.id);
		})

	})
}

async function traerInfo(){
	const response = await fetch("json/productos.json");
	const info = await response.json();
	crearHTML(filtrarProducto(info));
}

btnBuscarJoyeria.addEventListener("click",()=>{
	traerInfo();
})

//Función para uso de botón Agregar al Carrito.
//Y otra para mostrar ciertos elementos al hacer click en un botón.

async function agregarAlCarrito(id){
	const response = await fetch("json/productos.json");
	const info = await response.json();

	const producto = info.find((producto)=> producto.id === id);
	const productoEnCarrito = carrito.find((producto)=> producto.id === id);
	if(productoEnCarrito) {
		productoEnCarrito.cantidad++;
	}else{
		carrito.push(producto);
	}
}

function mostrarTitulosYBotones(array, clase){
	array.forEach(element=>{
		element.classList.toggle(clase)
	})
}


verCarrito.addEventListener("click", ()=> {
	mostrarCarrito();
	mostrarTitulosYBotones(toggles,"d-none");
	calcularTotal();
})

actualizarCarrito.addEventListener("click", ()=> {
	mostrarCarrito();
})

//Función para ver los productos agregados al carrito.

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
		const tarjeta = document.createElement("div");
		tarjeta.classList.add("col","col-4");
		tarjeta.innerHTML= `<div class="card">
								<img src= "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}"
								<div class="card-body">
									<h3 class="card-title"> ${producto.nombre} </h3>
									<p class="card-text"> $${producto.precio} </p>
									<div class="d-flex justify-content-evenly">
										<i class="bi bi-dash-lg"></i>
										<p class="card-text"> ${producto.cantidad} </p>
										<i class="bi bi-plus-lg"></i>
									</div>
									<button class="btn colorBoton" id="eliminar ${producto.id}">Eliminar producto</button>
								</div>
							</div>`
		contenedorCarrito.appendChild(tarjeta);
		
		const boton = document.getElementById(`eliminar ${producto.id}`);
		boton.addEventListener("click", ()=> {
			eliminarDelCarrito(producto.id);
		})

	})

	calcularTotal();
}

//Función para eliminar productos del carrito de a uno.

function eliminarDelCarrito(id){
	const producto = carrito.find((producto) => producto.id === id);
	const indice = carrito.indexOf(producto);
	carrito.splice(indice, 1);

	mostrarCarrito();
}

//Función para vaciar todo el carrito. Y reestablecer los títulos y botones originales.

vaciarCarrito.addEventListener("click", () => {
	vaciarCarritoEntero();
	mostrarTitulosYBotones(toggles,"d-none");
})

const vaciarCarritoEntero = () => {
	carrito= [];
	mostrarCarrito();
	localStorage.clear();
}

//Función para calcular precio de todos los productos agregados al carrito.

const calcularTotal = () => {
	let totalCompra = 0;

	carrito.forEach ((producto) => {
		totalCompra += producto.precio * producto.cantidad;
	})

	precioFinal.innerHTML = `$${totalCompra}`
}

botonFinCompra.addEventListener("click", () => {
	mostrarTitulosYBotones(toggles,"d-none");
	finalizarCompra()
})

function finalizarCompra () {
	finCompra.innerHTML = "";
	const tarjetaFin = document.createElement("div");
	tarjetaFin.classList.add("col-6");
	tarjetaFin.innerHTML= `<h1>Completá tus datos:</h1>
							<form>
								<input type="text" placeholder="Nombre y Apellido"/>
								<input type="text" placeholder="Teléfono"/>
								<input type="text" placeholder="Dirección"/>
								<input type="text" placeholder="Nombre y Apellido"/>
								<input type="text" placeholder="Nombre y Apellido"/>
								
	`
	finCompra.appendChild(tarjetaFin);
}