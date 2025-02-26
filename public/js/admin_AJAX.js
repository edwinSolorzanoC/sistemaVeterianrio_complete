document.addEventListener('DOMContentLoaded', function() {
    
   const actualizar_consultas = document.getElementById("actualizarConsultas")

    actualizar_consultas.addEventListener('click', function(){

        console.log("Si sirve")
        
        fetch('/actualizarConsultas' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json()).then(data => {
            console.log("Respuesta del servidor:", data); // Debug para ver el formato de la respuesta

            const tablaConsultas = document.getElementById('tablaConsultas').querySelector('tbody');            tablaConsultas.innerHTML = "";

            data.peticionConsultas.forEach(element => {

                const nuevaFila = tablaConsultas.insertRow(); 
                nuevaFila.insertCell(0).textContent = element.tb_consultaGeneral_col_nombrePaciente;
                nuevaFila.insertCell(1).textContent = element.tb_consultaGeneral_col_nombrePropietario;
                nuevaFila.insertCell(2).textContent = formatearFecha(element.tb_consultaGeneral_col_fecha);
                nuevaFila.insertCell(3).textContent = element.tb_costosConsultas_col_descripcion;
                nuevaFila.insertCell(4).textContent ="₡ "+element.tb_costosConsultas_col_consultal;
                nuevaFila.insertCell(5).textContent ="₡ "+element.tb_costosConsultas_col_medicamentos;
                nuevaFila.insertCell(6).textContent ="₡ "+element.tb_costosConsultas_col_extras;
                nuevaFila.insertCell(7).textContent ="₡ "+element.tb_costosConsultas_col_total;
                
            });
        }).catch(err => {
            console.log("Error al enviar los datos", err);
        });
        
    })

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

})

