document.addEventListener('DOMContentLoaded', function(){
    const iniciarSesion = document.getElementById("btn-iniciarSesion");
    const formulario = document.getElementById("formulario-iniciosesion");

    const crearCuenta = document.getElementById("btn-crearCuenta");
    const formularioCrearCuenta = document.getElementById("formulario-crearCuenta");

    const recuperarForm = document.getElementById("formulario-recuperarcontrasenna");
    const recuperar = document.getElementById("reestablecer-contrasenna"); 

    iniciarSesion.addEventListener('click', function(){
        if(formulario.style.display == 'none'){
            formulario.style.display = 'block';
            formularioCrearCuenta.style.display = 'none';
            recuperarForm.style.display = 'none'
        }else{
            formulario.style.display = 'none';
        }
    })

    
    crearCuenta.addEventListener('click', function(){
        if(formularioCrearCuenta.style.display == 'none'){
            formularioCrearCuenta.style.display = 'block';
            formulario.style.display = 'none';
            recuperarForm.style.display = 'none'
        }else{
            formularioCrearCuenta.style.display = 'none';
        }
    })

    recuperar.addEventListener('click', function(){
        if(recuperarForm.style.display === 'none'){
            formulario.style.display = 'none'
            formularioCrearCuenta.style.display = 'none'
            recuperarForm.style.display = 'block'
        }else{
            recuperarForm.style.display = 'none'
        }
    })


    
})