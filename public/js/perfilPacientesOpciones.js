document.addEventListener('DOMContentLoaded', function(){

    const mostrarInformacionGeneal = document.getElementById("mostrarInformacionGeneral");
    const informacionGeneral = document.getElementById("informacionGeneral");
    
    const mostrarInformacionConsultas = document.getElementById("mostrarInformacionConsultas");
    const informacionConsultas = document.getElementById("informacionConsultas");
    
    const mostrarInformacioVacunacion = document.getElementById("mostrarInformacionVacunacion");
    const informacionVacunacion = document.getElementById("informacionVacunacion");
    
    const mostrarinformacionPropietario = document.getElementById("mostrarinformacionPropietario");
    const informacionPropietario = document.getElementById("informacionPropietario");
    
    mostrarInformacionConsultas.addEventListener('click', function(){

        if(informacionConsultas.style.display === 'none'){
            informacionGeneral.style.display = 'none'
            informacionVacunacion.style.display = 'none'
            informacionPropietario.style.display = 'none'

            informacionConsultas.style.display = 'block'
        }

    });

    mostrarInformacionGeneal.addEventListener('click', function(){

        if(informacionGeneral.style.display === 'none'){
            informacionConsultas.style.display = 'none'
            informacionVacunacion.style.display = 'none'
            informacionPropietario.style.display = 'none'

            informacionGeneral.style.display = 'block'
            
        }

    });

    mostrarInformacioVacunacion.addEventListener('click', function(){

        if(informacionVacunacion.style.display === 'none'){
            informacionConsultas.style.display = 'none'
            informacionGeneral.style.display = 'none'
            informacionPropietario.style.display = 'none'

            informacionVacunacion.style.display = 'block'
        }

    });


   

    mostrarinformacionPropietario.addEventListener('click', function(){
        if(informacionPropietario.style.display === 'none'){
            informacionPropietario.style.display = 'block'

            informacionConsultas.style.display = 'none'
            informacionGeneral.style.display = 'none'
            informacionVacunacion.style.display = 'none'
        }
    });


    

    



})