document.addEventListener('DOMContentLoaded', function(){
    const iniciarSesion = document.getElementById("btn-iniciarSesion");
    const formulario = document.getElementById("formulario-iniciosesion");

    const crearCuenta = document.getElementById("btn-crearCuenta");
    const formularioCrearCuenta = document.getElementById("formulario-crearCuenta");


    iniciarSesion.addEventListener('click', function(){
        if(formulario.style.display == 'none'){
            formulario.style.display = 'block';
            formularioCrearCuenta.style.display = 'none';
        }else{
            formulario.style.display = 'none';
        }
    })

    
    crearCuenta.addEventListener('click', function(){
        if(formularioCrearCuenta.style.display == 'none'){
            formularioCrearCuenta.style.display = 'block';
            formulario.style.display = 'none';
        }else{
            formularioCrearCuenta.style.display = 'none';
        }
    })


    
})