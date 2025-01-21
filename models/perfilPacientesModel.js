import connection from "../config/conexion.js";

const perfilPacientesModel = {};


perfilPacientesModel.consultaInicio = (idVeterinaria, callback) => {
    const peticion = `SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre 
    FROM tb_pacientes 
    JOIN tb_propietarios ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`

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
    tb_pacientes_col_fechaUltimaConsulta,
    tb_propietarios_col_nombre,
    tb_propietarios_col_cedula,
    tb_propietarios_col_direccion,
    tb_propietarios_col_numeroTelefono,
    tb_propietarios_col_correoElectronico,
    tb_consultageneral_col_fecha,
    tb_consultageneral_col_motivo,
    tb_consultageneral_col_medicamentosUtilizados,
    tb_consultavacunacion_col_fecha,
    tb_consultavacunacion_col_desparacitacion,
    tb_consultavacunacion_col_vacunacion

    FROM tb_pacientes

    LEFT JOIN tb_propietarios 
    ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula

    LEFT JOIN tb_consultageneral
    ON tb_pacientes.idtb_pacientes = tb_consultageneral.tb_pacientes_idtb_pacientes

    LEFT JOIN tb_consultavacunacion
    ON tb_pacientes.idtb_pacientes = tb_consultavacunacion.tb_pacientes_idtb_pacientes

    WHERE 
    tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
    tb_pacientes_col_nombre = ? AND
    tb_propietarios_col_nombre = ?;`

    connection.query(peticion, [idVeterinaria, nombreMascota, nombrePropietario], callback);

}

export default perfilPacientesModel;


