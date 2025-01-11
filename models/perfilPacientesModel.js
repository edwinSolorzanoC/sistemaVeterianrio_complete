import connection from "../config/conexion.js";

const perfilPacientesModel = {};


perfilPacientesModel.consultaInicio = (idVeterinaria, callback) => {
    const peticion = `SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre 
    FROM tb_pacientes 
    JOIN tb_propietarios ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;`

    connection.query(peticion, [idVeterinaria], callback);
}

export default perfilPacientesModel;


