import conexion from '../config/conexion.js';

const validarUsuario = async (usuario, contrasenna) => {
    const query = `
    SELECT tb_usuariosVeterinaria_col_usuario, tb_usuariosVeterinaria_col_contrasenna
    FROM tb_usuariosVeterinaria
    WHERE tb_usuariosVeterinaria_col_usuario = ? AND tb_usuariosVeterinaria_col_contrasenna = ?;`;

    console.log('Consulta SQL:', query); // Verifica la consulta
    console.log('Parámetros:', usuario, contrasenna); // Verifica los parámetros

    const [rows] = await db.execute(query, [usuario, contrasenna]);
    console.log('Resultado:', rows); // Muestra el resultado de la consulta
    return rows.lenght > 0;
}

export default validarUsuario;