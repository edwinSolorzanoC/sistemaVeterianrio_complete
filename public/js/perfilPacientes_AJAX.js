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
                    document.getElementById('nombreMascota').value = data.datosPaciente[0].tb_pacientes_col_nombre;
                    document.getElementById('tipoMascota').value = data.datosPaciente[0].tb_pacientes_col_tipo;
                    document.getElementById('razaMascota').value = data.datosPaciente[0].tb_pacientes_col_raza;
                    document.getElementById('fechaNacimiento').value = formatearFecha(data.datosPaciente[0].tb_pacientes_col_fechaNacimiento);
                    document.getElementById('sexoMascota').value = data.datosPaciente[0].tb_pacientes_col_sexo;
                    document.getElementById('colorMascota').value = data.datosPaciente[0].tb_pacientes_col_color;
                    document.getElementById('castradoMascota').value = data.datosPaciente[0].tb_pacientes_col_castrado;
                    document.getElementById('edadMascota').value = data.datosPaciente[0].tb_pacientes_col_edad;
                    document.getElementById('cantidadPartos').value = data.datosPaciente[0].tb_partos_col_cantidad;
                    document.getElementById('fechaPartos').value = formatearFecha(data.datosPaciente[0].tb_partos_col_fechaParto);
                    document.getElementById('pesoMascota').value = data.datosPaciente[0].tb_pacientes_col_peso;
                    document.getElementById('ultimaConsulta').value = formatearFecha(data.datosPaciente[0].tb_pacientes_col_fechaUltimaConsulta);
                
                    document.getElementById('nombrePropietario').value = data.datosPaciente[0].tb_propietarios_col_nombre;
                    document.getElementById('cedulaPropietario').value = data.datosPaciente[0].tb_propietarios_col_cedula;
                    document.getElementById('diereccionPropietario').value = data.datosPaciente[0].tb_propietarios_col_direccion;
                    document.getElementById('telefonoPropietario').value = data.datosPaciente[0].tb_propietarios_col_numeroTelefono;
                    document.getElementById('correoElectronico').value = data.datosPaciente[0].tb_propietarios_col_correoElectronico;



                    // Manejar las consultas generales
                    const tablaConsultas = document.getElementById('tabla-resultados-consultas').querySelector('tbody');
                    tablaConsultas.innerHTML = "";  // Limpiar la tabla

                    data.consultasGenerales.forEach(item => {
                        const nuevaFila = tablaConsultas.insertRow();
                        nuevaFila.insertCell(0).textContent = formatearFecha(item.tb_consultaGeneral_col_fecha);
                        nuevaFila.insertCell(1).textContent = item.tb_consultaGeneral_col_motivo;
                        nuevaFila.insertCell(2).textContent = item.tb_consultaGeneral_col_medicamentosUtilizados;
                        nuevaFila.insertCell(3).textContent = "₡ " + item.tb_costosConsultas_col_total;
                    });

                    // Manejar las vacunaciones
                    const tablaVacunacion = document.getElementById('tabla-resultados-vacunacion').querySelector('tbody');
                    tablaVacunacion.innerHTML = "";  // Limpiar la tabla
                    data.vacunacion.forEach(item => {
                        const nuevaFilaVacunacion = tablaVacunacion.insertRow();
                        nuevaFilaVacunacion.insertCell(0).textContent = formatearFecha(item.tb_consultaVacunacion_col_fecha);
                        nuevaFilaVacunacion.insertCell(1).textContent = item.tb_consultaVacunacion_col_desparacitacion;
                        nuevaFilaVacunacion.insertCell(2).textContent = item.tb_consultaVacunacion_col_vacunacion;
                        nuevaFilaVacunacion.insertCell(3).textContent = "₡ " + item.tb_costosConsultas_col_total;
                    });


                })
                .catch(err => {
                    console.log("Error al enviar los datos", err);
                });
            });
        }
    });

    function formatearFecha(fechaISO) {
        // Convierte la fecha en un objeto Date
        if (!fechaISO) {
            return ""; // Retorna una cadena vacía si no hay dato
        }
    
        // Convierte la fecha en un objeto Date
        const fecha = new Date(fechaISO);
    
        // Verifica si la fecha es inválida
        if (isNaN(fecha)) {
            return ""; // Retorna una cadena vacía si la fecha no es válida
        }
    
        // Extrae el día, mes y año
        const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura que tenga dos dígitos
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan en 0
        const anio = fecha.getFullYear();
    
        // Retorna en el formato deseado (dd/mm/yyyy)
        return `${dia}/${mes}/${anio}`;
    }
});
