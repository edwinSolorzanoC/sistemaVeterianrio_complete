document.addEventListener("DOMContentLoaded", function(){
    const mostrarManevagacion = document.getElementById("btn-mostrar-navegacion");
    const navegacionHeader = document.getElementById("navegacion-header");

   mostrarManevagacion.addEventListener('click', function(){

    if(navegacionHeader.style.display === 'none'){
        navegacionHeader.style.display = 'block';
    }else{
        navegacionHeader.style.display = 'none'
    }

   })
})