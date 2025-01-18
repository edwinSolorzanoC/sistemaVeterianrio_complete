import connection from "../config/conexion.js";

const perfilPacientesModel = {};


perfilPacientesModel.consultaInicio = (idVeterinaria, callback) => {
    const peticion = `SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre 
    FROM tb_pacientes 
    JOIN tb_propietarios ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;`

    connection.query(peticion, [idVeterinaria], callback);
}

perfilPacientesModel.obtenerDatos = (idVeterinaria,nombreMascota,nombrePropietario, callback) => {
    const peticion = ` SELECT tb_pacientes_col_nombre, 
    tb_pacientes_col_tipo, 
    tb_pacientes_col_raza, 
    tb_pacientes_col_fechaNacimiento,
    tb_pacientes_col_color,
    tb_pacientes_col_castrado,
    tb_pacientes_col_edad,
    tb_pacientes_col_partos,
    tb_pacientes_col_fechaPartos,
    tb_pacientes_col_peso,
    tb_pacientes_col_fechaUltimaConsulta
    FROM tb_pacientes

    INNER JOIN tb_propietarios 
    ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

    WHERE 
    tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
    tb_pacientes_col_nombre = ? AND
    tb_propietarios_col_nombre = ?;`

    connection.query(peticion, [idVeterinaria, nombreMascota, nombrePropietario], callback);

}

export default perfilPacientesModel;


