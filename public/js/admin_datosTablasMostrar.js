
document.querySelectorAll("#tabla tr").forEach((fila, index) => {
    if (index > 0) { 
        fila.addEventListener("click", () => {

            const formulariogeneral = document.getElementById("formulario-general");
            
            const mascota = fila.cells[0].textContent;
            const nombre = fila.cells[1].textContent;

            if( formulariogeneral.style.display === 'none'){

                document.getElementById('nombrePacienteVacunacion').value = mascota;
                document.getElementById('nombrePropietarioVacunacion').value = nombre;

            }else{
                document.getElementById('nombrePacienteConsulta').value = mascota;
                document.getElementById('nombrePropietarioConsulta').value = nombre;
            }

        });
    }

    const limpiarConsultaGeneral = document.getElementById("btn-cancelardatos-consulta");
    limpiarConsultaGeneral.addEventListener('click', function() {
        document.getElementById('nombrePacienteConsulta').value = "";
        document.getElementById('nombrePropietarioConsulta').value = "";
        document.getElementById('motivoConsulta').value = "";
        document.getElementById('medicamentosConsulta').value = "";
        document.getElementById('pesoConsultaGeneral').value = "";
    })

    const limpiarConsultaVacunacion = document.getElementById("cancelardatos-vacunacion");

    limpiarConsultaVacunacion.addEventListener('click', function(){
        document.getElementById('nombrePropietarioVacunacion').value = "";
        document.getElementById('nombrePacienteVacunacion').value = "";
        document.getElementById('pesoVacunacion').value = "";
        document.getElementById('nombreInyeccionVacunacion').value = "";
        document.getElementById('nombreInyeccionDesparacitacion').value = "";
    })


    
});