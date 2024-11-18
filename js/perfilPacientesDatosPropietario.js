document.addEventListener('DOMContentLoaded', function(){

    const botonMostrar = document.getElementById("mostrarDatosPropietario");
    const datosPropietario = document.getElementById("datosPropietario");

    botonMostrar.addEventListener('click', function(){
        if(datosPropietario.style.display === 'none'){

            datosPropietario.style.display = 'block'
    
        }else{
            datosPropietario.style.display = 'none'
        }
    })
    


})