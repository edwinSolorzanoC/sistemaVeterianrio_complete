document.addEventListener('DOMContentLoaded', function(){

    const lineasTabla = document.querySelectorAll('.linea-tabla');
    lineasTabla.forEach((linea) => {
        linea.addEventListener('click', function() {
            // Primero, remueve el fondo de todos los elementos
            lineasTabla.forEach((l) => l.style.backgroundColor = '');
    
            // Luego, añade el fondo al elemento seleccionado
            linea.style.backgroundColor = '#77afc5';
        });
    });
    
})