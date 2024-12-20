document.addEventListener('DOMContentLoaded', function(){

    const volver = document.getElementById("volver");

    volver.addEventListener('click', function(){
        window.location.href = 'administracion.html';
    });
    
    const lineasTabla = document.querySelectorAll('.linea-tabla');
    const listaPacientes = document.getElementById('lista-pacientes');  // Selecciona la sección de la lista de pacientes


    lineasTabla.forEach((linea) => {
    
        linea.addEventListener('click', function() {
    
            // Primero, remueve el fondo de todos los elementos
            lineasTabla.forEach((l) => l.style.backgroundColor = '');
    
            // Luego, añade el fondo al elemento seleccionado
            linea.style.backgroundColor = '#77afc5';
    
        });
    
    });
    
})