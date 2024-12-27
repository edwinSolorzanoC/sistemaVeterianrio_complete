document.addEventListener('DOMContentLoaded', function(){

    //opciones de consultas
    const mostrarconsultas = document.getElementById("mostrarconsultas");
    const mostrarvacunas = document.getElementById("mostrarvacunas");

    //formularios de consultas
    const formulariogeneral = document.getElementById("formulario-general");
    const formulariovacunas = document.getElementById("formulario-vacunas");




    //muestra el formulario de consulta general
    mostrarconsultas.addEventListener('click', function(){
        if (formulariogeneral.style.display === 'none' || formulariogeneral.style.display === '') {
            formulariogeneral.style.display = 'block';
            formulariovacunas.style.display = 'none'; 
        }
    });

    //muestra el formulario de vacunacion
    mostrarvacunas.addEventListener('click', function(){
        if (formulariovacunas.style.display === 'none' || formulariovacunas.style.display === '') {
            formulariovacunas.style.display = 'block';
            formulariogeneral.style.display = 'none'; 
        }
    });

    const irARegsitropacientes = document.getElementById("agregarpacientes");


    irARegsitropacientes.addEventListener('click', function(){
        window.location.href = 'registroPaciente.html';
    });

    const irAPercilPacientes = document.getElementById("verpacientes");

    irAPercilPacientes.addEventListener('click', function(){
        window.location.href = '/perfilPacientes';
    });

    const cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.addEventListener('click', function(){
        window.location.href = 'index.html'
    })


    



});
