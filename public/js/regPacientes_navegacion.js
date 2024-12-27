document.addEventListener('DOMContentLoaded', function() {

    const mostrarRegistroPropietario = document.getElementById("btn-mostrarRegistroPropietario"); // Aquí está corregido
    const mostrarRegistroPaciente = document.getElementById("btn-mostrarRegistroPaciente");

    const registroPropietario = document.getElementById("registroPropietario");
    const registroPaciente = document.getElementById("registroPaciente");

    mostrarRegistroPaciente.addEventListener('click', function() {

        registroPropietario.style.display = "none";
        registroPaciente.style.display = "block";
        

    });
    mostrarRegistroPropietario.addEventListener('click', function() {

        registroPaciente.style.display = "none";
        registroPropietario.style.display = "block";
        

    });



});