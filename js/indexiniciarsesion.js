document.addEventListener('DOMContentLoaded', function(){
    const iniciarSesion = document.getElementById("btn-iniciarSesion");
    const formulario = document.getElementById("formulario-iniciosesion");


    iniciarSesion.addEventListener('click', function(){
        if(formulario.style.display == 'none'){
            formulario.style.display = 'block';
        }else{
            formulario.style.display = 'none';
        }
    })


    const ingresarSistema = document.getElementById("ingresar-sistema");

    ingresarSistema.addEventListener('click', function(){

        window.location.href = 'administracion.html';

    })
})