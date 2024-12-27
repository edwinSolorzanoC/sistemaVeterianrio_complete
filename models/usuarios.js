import conexion from '../config/conexion.js';

const verificarUsuario = (usuario, contrasenna, callback) => {
    
    const query = 'SELECT tb_usuariosVeterinaria_col_usuario, tb_usuariosVeterinaria_col_contrasenna FROM tb_usuariosVeterinaria WHERE tb_usuariosVeterinaria_col_usuario = ? and tb_usuariosVeterinaria_col_contrasenna = ?';
    
    conexion.query(query, [usuario, contrasenna], (error, results) => {
        if (error) {
            console.log("ERROR EN LINEA 9 DE USUARIOS.JS");
            return callback(error);
        }
        else{
            return callback(null, results);
        }
    });
}

export {verificarUsuario}

