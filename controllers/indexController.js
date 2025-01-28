import indexModel from '../models/indexModel.js';
import bcrypt from 'bcryptjs';

const indexController = {};

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


    bcrypt.hash(password, 10, (error, hashedPassword) => {
        if(error){
            console.log("Error en la encriptacion de password")
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
              } else {
                console.log("Usuario creado exitosamente:", results);
                res.redirect("/");
              }
            }
          );
          
    })
  
    
  };

export default indexController;
