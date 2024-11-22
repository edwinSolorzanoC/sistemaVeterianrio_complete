document.addEventListener('DOMContentLoaded', function(){

    const mostrarInformacionGeneal = document.getElementById("mostrarInformacioGeneral");
    const informacionGeneral = document.getElementById("informacionGeneral");
    
    const mostrarInformacionConsultas = document.getElementById("mostrarInformacionConsultas");
    const informacionConsultas = document.getElementById("informacionConsultas");
    
    const mostrarInformacioVacunacion = document.getElementById("mostrarInformacioVacunacion");
    const informacionVacunacion = document.getElementById("informacionVacunacion");
    
    mostrarInformacionConsultas.addEventListener('click', function(){

        if(informacionConsultas.style.display === 'none'){
            informacionGeneral.style.display = 'none'
            informacionVacunacion.style.display = 'none'
            informacionConsultas.style.display = 'block'
        }

    });

    mostrarInformacionGeneal.addEventListener('click', function(){

        if(informacionGeneral.style.display === 'none'){
            informacionConsultas.style.display = 'none'
            informacionVacunacion.style.display = 'none'
            informacionGeneral.style.display = 'block'
            
        }

    });

    mostrarInformacioVacunacion.addEventListener('click', function(){

        if(informacionVacunacion.style.display === 'none'){
            informacionConsultas.style.display = 'none'
            informacionGeneral.style.display = 'none'
            informacionVacunacion.style.display = 'block'
        }

    });


    const botonMostrar = document.getElementById("mostrarDatosPropietario");
    const datosPropietario = document.getElementById("datosPropietario");

    botonMostrar.addEventListener('click', function(){
        if(datosPropietario.style.display === 'none'){

            datosPropietario.style.display = 'block'
    
        }else{
            datosPropietario.style.display = 'none'
        }
    });

    



})