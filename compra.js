const inputNombre = document.getElementById("inputNombre");
const inputCP = document.getElementById("inputCP");
const inputDireccion = document.getElementById("inputDireccion");
const inputEmail = document.getElementById("inputEmail");
const transferencia = document.getElementById("transferencia");
const btnTransferencia = document.getElementById("btnTransferencia");

//Generar tarjeta con datos de transferencia

function generarDatosTransferencia() {
    btnTransferencia.addEventListener("click", (e)=>{
        e.preventDefault();
        if(!inputNombre.value||!inputCP.value||!inputDireccion.value||!inputEmail.value){
            Toastify({
                text: "Completá todos los datos",
                duration: 3000,
                gravity: "bottom",
                position: "left"
                }).showToast();
        }else{
            transferencia.innerHTML = "";
            const tarjetaTransferencia = document.createElement("div");
            tarjetaTransferencia.classList.add("col-xl-3","col-md-6","col-xs-12");
            tarjetaTransferencia.innerHTML= `<div class="card">
                                                <h2>Datos de pago:</h2>
                                                <div class="p-2">
                                                    <span>CBU: 1111111111111111111111</span>
                                                </div>
                                                <div class="p-2">
                                                    <span>Alias: alias.falso.falso</span>
                                                </div>
                                                <div class="p-2">
                                                    <p>Una vez realizado el pago, envianos el comprobante a mail@falso.com,
                                                    para completar el proceso de compra y coordinar el envío.</p>
                                                </div class="p-2">
                                                <h2>¡Gracias por tu compra!</h2>
                                            </div>
                                            `
                transferencia.appendChild(tarjetaTransferencia);
        }
    })
}

generarDatosTransferencia();