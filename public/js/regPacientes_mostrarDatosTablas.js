document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll("#tabla tr").forEach((fila, index) => {
        if (index > 0) { 
            fila.addEventListener("click", () => {
    
                const cedula = fila.cells[0].textContent;
                document.getElementById('cedulaPropietarioMascota').value = cedula;
    
                
            });
        }
    
    });
    
    document.getElementById('fechaNacimientoMascota').addEventListener('change', function() {
        const fechaNacimientoMascota = new Date(this.value);
        const fechaHoy = new Date();
    
        let edad = fechaHoy.getFullYear() - fechaNacimientoMascota.getFullYear();
        let mes = fechaHoy.getMonth() - fechaNacimientoMascota.getMonth();
    
        if (mes < 0 || (mes === 0 && fechaHoy.getDate() < fechaNacimientoMascota.getDate())) {
            edad--;
            mes += 12; // Asegurar que los meses sean positivos
        }
    
        // Si es menor de un año, calcular la edad en formato decimal
        const edadConDecimales = edad + (mes / 12);
        document.getElementById('edadMascota').value = edadConDecimales.toFixed(1); // Ejemplo: 0.3 para 3 meses

    });

    const limpiarRegistroPropietarios = document.getElementById("cancelardatos-propietarios");

    limpiarRegistroPropietarios.addEventListener('click', function(){
        document.getElementById('cedulaPropietario').value = "";
        document.getElementById('nombrePropietario').value = "";
        document.getElementById('direccionPropietario').value = "";
        document.getElementById('telefonoPropietario').value = "";
        document.getElementById('correoPropietario').value = "";
    })

    const limpiarRegistroMascotas = document.getElementById("cancelardatos-mascotas");

    limpiarRegistroMascotas.addEventListener('click', function(){
        document.getElementById('nombreMascota').value = "";
        document.getElementById('tipoMascota').value = "";
        document.getElementById('pesoMascota').value = "";
        document.getElementById('fechaNacimientoMascota').value = "";
        document.getElementById('edadMascota').value = "";
        document.getElementById('razaMascota').value = "";
        document.getElementById('castracionMascota').value = "";
        document.getElementById('colorMascota').value = "";
        document.getElementById('partosMascota').value = "";
        document.getElementById('fechaPartosMascota').value = "";
        document.getElementById('sexoMascota').value = "";
        document.getElementById('cedulaPropietarioMascota').value = "";

    })


}) 

