import connection from "../config/conexion.js";

const administracionModel = {};

administracionModel.consultaInicio = (idVeterinaria, callback) => {
    const queryDatosUsuario = `SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre, tb_pacientes_col_fechaUltimaConsulta 
    FROM tb_pacientes 
    JOIN tb_propietarios 
    ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;`

    connection.query(queryDatosUsuario, [idVeterinaria], callback);

};

administracionModel.consultaGeneralSinPaciente = (nombrePropietarioConsulta,
    nombrePacienteConsulta,
    motivoConsulta,
    medicamentosConsulta,
    pesoConsultaGeneral,
    fechaAutomatica,
    idVeterinaria,
     callback) => {
    
    const peticion = `INSERT INTO tb_consultageneral (tb_consultaGeneral_col_nombrePropietario, 
        tb_consultaGeneral_col_nombrePaciente,
        tb_consultaGeneral_col_motivo, 
        tb_consultaGeneral_col_medicamentosUtilizados, 
        tb_consultaGeneral_col_actualizacionPeso,
        tb_consultaGeneral_col_fecha, 
        tb_usuariosVeterinaria_idtb_usuariosVeterinaria)
        VALUES(?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
        );`;

        connection.query(peticion, [nombrePropietarioConsulta,
            nombrePacienteConsulta,
            motivoConsulta,
            medicamentosConsulta,
            pesoConsultaGeneral,
            fechaAutomatica,
            idVeterinaria], callback);
}

administracionModel.consultaVacunacionSinPaciente = (idVeterinaria, callback) => (
    nombrePropietarioVacunacion,
    nombrePacienteVacunacion,
    pesoVacunacion,
    nombreInyeccionVacunacion,
    nombreInyeccionDesparacitacion,
    fechaAutomatica,
    idVeterinaria, callback) => {

    const peticion = `INSERT INTO tb_consultaVacunacion (
        tb_consultaVacunacion_col_nombrePropietario, 
        tb_consultaVacunacion_col_nombrePaciente,
        tb_consultaVacunacion_col_actualizacionPeso,
        tb_consultaVacunacion_col_vacunacion, 
        tb_consultaVacunacion_col_desparacitacion,
        tb_consultaVacunacion_col_fecha,
        tb_usuariosVeterinaria_idtb_usuariosVeterinaria)
        VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
        );`;

        connection.query(peticion, [nombrePropietarioVacunacion,
            nombrePacienteVacunacion,
            pesoVacunacion,
            nombreInyeccionVacunacion,
            nombreInyeccionDesparacitacion,
            fechaAutomatica,
            idVeterinaria], callback);
        
}

export default administracionModel;
