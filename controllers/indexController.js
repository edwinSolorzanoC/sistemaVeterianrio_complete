import validarUsuario from '../models/indexModel.js';

const verificarCrendenciales = async (req, res) => {
    const {usuario, contrasenna} = req.body;

    if(!usuario || !contrasenna){
        
        console.log('Usuario y contraseña son requeridos');
    }

    try{

        const resultado = await validarUsuario(usuario, contrasenna);
        
        if(resultado){
            console.log("Usuario y contraseña correctos");
        }else{
            console.log("Usuario y contraseña incorrectos");
        }

    }catch{

        console.log('Error en la validacion de usuario y contraseña');

    }
}

export default {verificarCrendenciales};