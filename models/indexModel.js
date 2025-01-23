import connection from '../config/conexion.js';

const consultaInicioSesion = {};

// Método para consultar un usuario por su nombre de usuario
consultaInicioSesion.consultaBaseDatos = (username, callback) => {
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return callback(new Error('Nombre de usuario inválido'));
    }
    
    const query = `SELECT idtb_usuariosVeterinaria, tb_usuariosVeterinaria_col_usuario, tb_usuariosVeterinaria_col_contrasenna 
    FROM tb_usuariosVeterinaria 
    WHERE tb_usuariosVeterinaria_col_usuario = ?;`;

    connection.query(query, [username], callback);
};

export default consultaInicioSesion;
