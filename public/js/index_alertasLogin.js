import Swal from "sweetalert2";

const urlParametros = new URLSearchParams(window.location.search);
const alerta = urlParametros.get('error');

// nada es esto sirve aun, en router de login si se envan los parametros a 
// la ruta pero aca no se ejecutan por alguna razon desconocida 


if(alerta === 'mensajeUsuarioNoEncontrado'){
   
    console.log("estoy en el if de database");
    
    Swal.fire({
        icon: 'error',
        title: 'Usuario no encontrado',
        text: 'El usuario no se encuentra registrado'
    });
}else{
    console.log("estoy en el else de database");
    Swal.fire({
        icon: 'error',
        title: 'Error en la base de datos',
        text: 'Ha ocurrido un error en la base de datos, por favor intente de nuevo'
    });

}