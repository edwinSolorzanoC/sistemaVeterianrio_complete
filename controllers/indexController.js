import consultaInicioSesion from '../models/indexModel.js';

const usuarioController = {};

// Método para manejar el inicio de sesión
usuarioController.iniciarSesion = (req, res) => {
    const { username, password } = req.body;

    consultaInicioSesion.consultaBaseDatos(username, (error, results) => {
        try {
            if (error) {
                console.error("Error en la consulta a la base de datos:", error);
                return res.redirect('/');
            }

            if (results.length > 0) {
                const usuario = results[0];
                if (usuario.tb_usuariosVeterinaria_col_contrasenna === password) {
                    console.log("Inicio de sesión exitoso");
                    return res.redirect('/administracion');
                } else {
                    console.log("Contraseña incorrecta");
                    return res.redirect('/');
                }
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

export default usuarioController;
