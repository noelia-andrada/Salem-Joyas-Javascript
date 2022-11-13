const contenedorDatosPrincipales = document.getElementById("contenedorDatosPrincipales");
const inputNombre = document.getElementById("inputNombre");
const inputCP = document.getElementById("inputCP");
const inputDireccion = document.getElementById("inputDireccion");
const inputEmail = document.getElementById("inputEmail");
const transferencia = document.getElementById("transferencia");
const tarjeta = document.getElementById("tarjeta");
const btnTransferencia = document.getElementById("btnTransferencia");
const btnTarjeta = document.getElementById("btnTarjeta");

function generarDatosTransferencia() {
    btnTransferencia.addEventListener("click", (e)=>{
        if(!inputNombre.value||!inputCP.value||!inputDireccion.value||!inputEmail.value){
            e.preventDefault();
            Toastify({
                text: "Completá todos los datos",
                duration: 3000
                }).showToast();
        }else{
            e.preventDefault();
            transferencia.innerHTML = "";
            const tarjetaTransferencia = document.createElement("div");
            tarjetaTransferencia.classList.add("col-xl-3","col-md-6","col-xs-12");
            tarjetaTransferencia.innerHTML= `<div class="card">
                                                <h2>Datos de pago:</h2>
                                                    <div>
                                                        <span>CBU: 1111111111111111111111</span>
                                                    <div>
                                                        <span>Alias: alias.falso.falso</span>
                                                    <div>
                                                        <p>Una vez realizado el pago, envianos el comprobante a mail@falso.com,
                                                        para comenzar el proceso de envío.</p>
                                                    </div>
                                            </div>`
                transferencia.appendChild(tarjetaTransferencia);
        }
    })
}

generarDatosTransferencia();