import connection from "../config/conexion.js";

const registroPacientesModel = {};

registroPacientesModel.consultaInicio = (idVeterinaria, callback) => {
    const peticion = `SELECT tb_propietarios_col_cedula, tb_propietarios_col_nombre 
    FROM tb_propietarios 
    WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;`

    connection.query(peticion, [idVeterinaria], callback);
}

export default registroPacientesModel

