import indexModel from '../models/indexModel.js';
import bcrypt from 'bcryptjs';

const indexController = {};


indexController.inciarPage = (req, res) => {
    res.render('index')
}

// Método para manejar el inicio de sesión
indexController.iniciarSesion = (req, res) => {

    const { username, password } = req.body;

    indexModel.consultaBaseDatos(username, (error, results) => {
    
        try {
    
            if (error) {
                
                console.error("Error en la consulta a la base de datos:", error);
                return res.redirect('/');
            }

            if (results.length > 0) {
    
                const usuario = results[0];
    
                // Comparar la contraseña en texto plano con la encriptada en la base de datos
                bcrypt.compare(password, usuario.tb_usuariosVeterinaria_col_contrasenna, (err, isMatch) => {
                    if (err) {
                        console.error("Error al comparar la contraseña:", err);
                        return res.redirect('/');
                    }

                    if (isMatch) {

                        req.session.user = {
                            id: usuario.idtb_usuariosVeterinaria,
                            nombreSistema: usuario.tb_usuariosVeterinaria_col_nombre,
                        };

                        // Contraseña correcta
                        console.log("Inicio de sesión exitoso");
                        return res.redirect('/administracion');
                        
                    } else {
                        // Contraseña incorrecta
                        console.log("Contraseña incorrecta");
                        return res.redirect('/');
                    }
                });
    
            } else {
    
                console.log("Usuario no encontrado");
                return res.redirect('/');
    
            }
    
        } catch (error) {
    
            console.error("Error en el controlador:", error);
            return res.redirect('/');
    
        }
    
    });

};


indexController.crearUsuario = (req, res) => {
    const {
        nombreUsuario,
        nombreSistema,
        password,
        correoElectronico,
        numeroTelefono,
        direccion,
        claveSeguridad,
    } = req.body;

    // Validaciones de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        console.log("La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula y un número.");
        return res.redirect('/?error=invalidPassword');
    
    }else{

        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if (error) {
                console.log("Error en la encriptación de la contraseña.");
            }
    
            indexModel.crearUsuario(
                nombreUsuario,
                nombreSistema,
                hashedPassword,
                correoElectronico,
                numeroTelefono,
                direccion,
                claveSeguridad,
                (error, results) => {
                    if (error) {
                        console.log("Error en la creación de usuario/controller", results);
                        return res.status(500).send("Error al crear el usuario.");
                    } 
                    
                    if (results.error === "invalidKey") {
                        console.log("Clave de seguridad incorrecta.");
                        return res.redirect('/?error=invalidKey');
                    }

                    console.log("Usuario creado exitosamente:");
                    return res.redirect("/?success=userCreated");                    
                }
            );
        });
    }

    
};

export default indexController;
