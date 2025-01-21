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

                    document.getElementById('nombrePropietario').value = data.tb_propietarios_col_nombre;
                    document.getElementById('nombrePropietario').value = data.tb_propietarios_col_nombre;
                    document.getElementById('nombrePropietario').value = data.tb_propietarios_col_nombre;

                    const tablaResultados = document.getElementById('tabla-resultados-consultas').querySelector('tbody');; // Tabla donde se agregarán los datos
                    tablaResultados.innerHTML = ""; // Borra todas las filas
                    const nuevaFila = tablaResultados.insertRow(); // Crear una nueva fila

                    nuevaFila.insertCell(0).textContent = formatearFecha(data.tb_consultageneral_col_fecha);
                    nuevaFila.insertCell(1).textContent = data.tb_consultageneral_col_motivo;
                    nuevaFila.insertCell(2).textContent = data.tb_consultageneral_col_medicamentosUtilizados;

                    const tablaResultadosVacunacion = document.getElementById('tabla-resultados-vacunacion').querySelector('tbody');; // Tabla donde se agregarán los datos
                    tablaResultadosVacunacion.innerHTML = ""; // Borra todas las filas
                    const nuevaFilaVacunacion = tablaResultadosVacunacion.insertRow(); // Crear una nueva fila

                    nuevaFilaVacunacion.insertCell(0).textContent = formatearFecha(data.tb_consultavacunacion_col_fecha);
                    nuevaFilaVacunacion.insertCell(1).textContent = data.tb_consultavacunacion_col_desparacitacion;
                    nuevaFilaVacunacion.insertCell(2).textContent = data.tb_consultavacunacion_col_vacunacion;




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
