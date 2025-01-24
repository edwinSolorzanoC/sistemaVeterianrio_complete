document.addEventListener('DOMContentLoaded', function(){

    const mostrarconsultas = document.getElementById("mostrarconsultas");
    const tablaconsultas = document.getElementById("consultageneral");

    const mostrarvacunas = document.getElementById("mostrarvacunas");
    const consultavacunacion = document.getElementById("consultavacunacion")
    
    mostrarconsultas.addEventListener('click', function(){
        if(tablaconsultas.style.display === 'none' || tablaconsultas-this.style.display === ''){
            tablaconsultas.style.display = 'block'
            consultavacunacion.style.display = 'none'
        }
    })

    mostrarvacunas.addEventListener('click', function(){
        if(consultavacunacion.style.display === 'none' || consultavacunacion.style.display === ''){
            consultavacunacion.style.display = 'block'
            tablaconsultas.style.display = 'none'
        }
    })
    


})