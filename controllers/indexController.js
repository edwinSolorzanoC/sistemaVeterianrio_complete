import indexModel from '../models/indexModel.js';
import bcrypt from 'bcryptjs';

const indexController = {};


indexController.inciarPage = (req, res) => {
    res.render('index')
}

indexController.iniciarSesion = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Llamada al modelo para consultar el usuario
        const results = await indexModel.consultaBaseDatos(username);

        if (results.length > 0) {
            const usuario = results[0];

            // Comparar la contraseña en texto plano con la encriptada en la base de datos
            const isMatch = await bcrypt.compare(password, usuario.tb_usuariosVeterinaria_col_contrasenna);
            
            if (isMatch) {
                req.session.user = {
                    id: usuario.idtb_usuariosVeterinaria,
                    nombreSistema: usuario.tb_usuariosVeterinaria_col_nombre,
                };

                // Inicio de sesión exitoso
                return res.redirect('/administracion?success=loginSuccess');
                
            } else {
                // Contraseña incorrecta
                return res.redirect('/?error=incorrectPassword');
            }
        } else {
            // Usuario no encontrado
            return res.redirect('/?error=userNotFound');
        }
    } catch (error) {
        // Manejo de errores en el controlador
        console.error("Error en el controlador:", error);
        return res.redirect('/?error=internalError');
    }
};


indexController.crearUsuario = async (req, res) => {
    const {
        nombreUsuario, nombreSistema,
        password, correoElectronico,
        numeroTelefono, direccion,
        claveSeguridad,} = req.body;

    // Validaciones de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        // contraseña no validad
        return res.redirect('/?error=invalidPassword');
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await indexModel.crearUsuario(nombreUsuario, nombreSistema,
            hashedPassword, correoElectronico,
            numeroTelefono, direccion,
            claveSeguridad
        );
        if(results.error === "invalidKey"){
            // clave de seguridad incorrcta
            return res.redirect('/?error=invalidKey')
        }
        // usuario creado exitosamente
        return res.redirect('/?success=userCreated')
    }catch(error){
        //Error interno
        console.log("Error en la creación de usuario/controller", error);
        return res.redirect('/?success=internalError')
    }
};

indexController.reestablecerContrasenna = async (req, res) => {
    const {claveSeguridadRes, usernameRes, passwordRes} = req.body

    // Validaciones de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(passwordRes)) {
        return res.redirect('/?error=invalidPassword');
    }

    try{

        const hashedPassword = await bcrypt.hash(passwordRes, 10);
        const results = await indexModel.actualizarContrasenna(claveSeguridadRes, usernameRes, hashedPassword);

        if(results.error === "userpassNotFound"){
            // clave de seguridad incorrcta
            return res.redirect('/?error=invalidKey')
        }
        if (results.affectedRows === 0) {
            console.log("No se encontró el usuario");
            return res.redirect('/?error=userpassNotFound');
        }

        //contraseña actualizada
        return res.redirect("/?success=passUpdate");  
    }catch(error){
        console.log("Error en la actualizacion de password/controller", error);
    }

}

export default indexController;
