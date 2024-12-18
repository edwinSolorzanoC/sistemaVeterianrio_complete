
document.querySelectorAll("#tabla tr").forEach((fila, index) => {
    if (index > 0) { 
        fila.addEventListener("click", () => {

            const formulariogeneral = document.getElementById("formulario-general");
            const formulariovacunas = document.getElementById("formulario-vacunas");
            
            const mascota = fila.cells[0].textContent;
            const nombre = fila.cells[1].textContent;

            if( formulariogeneral.style.display === 'none'){

                document.getElementById('nombrePacienteVacunacion').value = mascota;
                document.getElementById('nombrePropietarioVacunacion').value = nombre;

                document.getElementById('nombrePacienteConsulta').value = mascota;
                document.getElementById('nombrePropietarioConsulta').value = nombre;

            }else{

                document.getElementById('nombrePacienteVacunacion').value = mascota;
                document.getElementById('nombrePropietarioVacunacion').value = nombre;

                
                document.getElementById('nombrePacienteConsulta').value = mascota;
                document.getElementById('nombrePropietarioConsulta').value = nombre;
            }

        });
    }


    
});