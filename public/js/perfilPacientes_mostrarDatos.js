document.querySelectorAll("#tabla-pacientes tr").forEach((fila, index) => {

    if(index > 0){
        fila.addEventListener('click', () => {
            const nombreMascota = fila.cells[0].textContent;
            const nombrePropietario = fila.cells[1].textContent;

            const datosTabla = {nombreMascota, nombrePropietario}

            console.log(datosTabla)

            fetch('/enviodedatos', {
                method: 'post', // Usar el método POST
                headers: {
                    'Content-Type': 'application/json' // Especificar tipo de contenido
                },
                body: JSON.stringify(datosTabla) // Convertir los datos a JSON
            })
                .then(response => response.json()) // Parsear la respuesta como JSON
                .then(data => {
                    console.log("Respuesta del controlador:", data); // Mostrar respuesta del servidor
                })
                .catch(error => {
                    console.error("Error al enviar los datos:"); // Manejar errores
                });

        })
    }

})