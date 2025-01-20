document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todas las filas de la tabla
    document.querySelectorAll("#tabla-pacientes tr").forEach((fila, index) => {
        // Ignora la primera fila (cabecera de la tabla)
        if (index > 0) {
            fila.addEventListener("click", function() {
                // Obtiene los datos de la fila clickeada
                const nombreMascota = fila.cells[0].textContent;  // Primera celda (nombre mascota)
                const nombrePropietario = fila.cells[1].textContent;  // Segunda celda (nombre propietario)

                // Enviar los datos al servidor usando fetch (AJAX)
                fetch('/enviodedatos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombreMascota, nombrePropietario })
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Datos Procesados", data);
                    document.getElementById('nombreMascota').value = data.tb_pacientes_col_nombre;
                    document.getElementById('tipoMascota').value = data.tb_pacientes_col_tipo;
                    document.getElementById('razaMascota').value = data.tb_pacientes_col_raza;
                    document.getElementById('fechaNacimiento').value = data.tb_pacientes_col_fechaNacimiento;
                    document.getElementById('colorMascota').value = data.tb_pacientes_col_color;
                    document.getElementById('castradoMascota').value = data.tb_pacientes_col_castrado;
                    document.getElementById('edadMascota').value = data.tb_pacientes_col_edad;
                    document.getElementById('cantidadPartos').value = data.tb_pacientes_col_partos;
                    document.getElementById('fechaPartos').value = data.tb_pacientes_col_fechaPartos;
                    document.getElementById('pesoMascota').value = data.tb_pacientes_col_peso;
                    document.getElementById('ultimaConsulta').value = data.tb_pacientes_col_fechaUltimaConsulta;
                
                    document.getElementById('nombrePropietario').value = data.tb_propietarios_col_nombre;
                    document.getElementById('cedulaPropietario').value = data.tb_propietarios_col_cedula;
                    document.getElementById('diereccionPropietario').value = data.tb_propietarios_col_direccion;
                    document.getElementById('telefonoPropietario').value = data.tb_propietarios_col_direccion;
                    document.getElementById('correoElectronico').value = data.tb_propietarios_col_correoElectronico;

                })
                .catch(err => {
                    console.log("Error al enviar los datos", err);
                });
            });
        }
    });
});
