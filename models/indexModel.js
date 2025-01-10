import connection from '../config/conexion.js';


const consultaInicioSesion = {};

// Método para consultar un usuario por su nombre de usuario
consultaInicioSesion.consultaBaseDatos = (username, callback) => {
    const query = "SELECT idtb_usuariosVeterinaria, tb_usuariosVeterinaria_col_usuario, tb_usuariosVeterinaria_col_contrasenna FROM tb_usuariosVeterinaria WHERE tb_usuariosVeterinaria_col_usuario = ?;";
    connection.query(query, [username], callback);
};

export default consultaInicioSesion;

/*
const consultarUsuario = {}; // Define el objeto donde guardarás tus métodos

// Método para consultar el usuario
consultarUsuario.consultar = (req, res) => {
    const datosFormulario = req.body;

    let usuarioFormulario = datosFormulario.username;
    let contrasennaFormulario = datosFormulario.password;

    let peticionBaseDatos = "SELECT idtb_usuariosVeterinaria, tb_usuariosVeterinaria_col_usuario, tb_usuariosVeterinaria_col_contrasenna FROM tb_usuariosVeterinaria WHERE tb_usuariosVeterinaria_col_usuario = ?;";

    connection.query(peticionBaseDatos, [usuarioFormulario], async function (error, results) {
        try {
            console.log(usuarioFormulario, contrasennaFormulario)
            if (results.length > 0) {
                if (results[0].tb_usuariosVeterinaria_col_contrasenna === contrasennaFormulario) {
                    console.log("Ingreso exitoso");
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
            console.log("Error en la consulta de usuarios", error);
            return res.redirect('/');
        }
    });
};


export { consultarUsuario };
*/