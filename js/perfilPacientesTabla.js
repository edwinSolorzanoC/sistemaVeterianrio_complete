document.querySelectorAll("#tabla-pacientes tr").forEach((fila, index) => {

    if(index > 0){
        fila.addEventListener('click', () => {
            const nombreMascota = fila.cells[0].textContent;
            const nombrePropietario = fila.cells[1].textContent;

            document.getElementById("nombrePropietario").value = nombrePropietario;
            document.getElementById("nombreMascota").value = nombreMascota;
            document.getElementById("tipoMascota").value = "Canino";
            document.getElementById("razMascota").value = "Boxer";
            document.getElementById("fechaNacimiento").value = "06/11/22";
            document.getElementById("sexoMascota").value = "Macho";
            document.getElementById("colorMascota").value = "cafe";
            document.getElementById("castradoMascota").value = "No";
            document.getElementById("edadMascota").value = "2.1";
            document.getElementById("cantidadPartos").value = "0";
            document.getElementById("fechaPartos").value = "00/00/00";
            document.getElementById("pesoMascota").value = "35";
            document.getElementById("ultimaConsulta").value = "02/11/24";


            document.getElementById("nombrePropietario2").value = nombrePropietario;
            document.getElementById("cedulaPropietario").value = "208470215";
            document.getElementById("diereccionPropietario").value = "pavas san isidro atenas";
            document.getElementById("telefonoPropietario").value = "60263229";
            document.getElementById("correoElectronico").value = "edwinunki26@gmail.com";
        })
    }

})