import pool from "../config/conexion.js";

const administracionModel = {};

administracionModel.consultaInicio = async (idVeterinaria) => {

    if (!Number.isInteger(idVeterinaria)) {
        res.redirect('/?error=internalError');
    }

    const queryDatosUsuario = `SELECT tb_pacientes_col_nombre, 
    tb_propietarios_col_nombre, tb_pacientes_col_fechaUltimaConsulta 
    FROM tb_pacientes 
    JOIN tb_propietarios 
    ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;

    try {
        const [results] = await pool.execute(queryDatosUsuario, [idVeterinaria]);
        return results;
    } catch (error) {
        console.log("ERROR:M:ADMIN:START: ", error)
        res.redirect('/?error=internalError');
    }
};



administracionModel.consultaGeneral = async (nombrePropietarioConsulta,
    nombrePacienteConsulta, motivoConsulta,
    medicamentosConsulta, pesoConsultaGeneral,
    fechaAutomatica, idVeterinaria
) => {
    const verificarExistenciaPacientes = `
        SELECT idtb_pacientes
        FROM tb_pacientes
        JOIN tb_propietarios
        ON tb_propietarios.tb_propietarios_col_cedula = tb_pacientes.tb_propietarios_tb_propietarios_col_cedula
        WHERE tb_pacientes_col_nombre = ? AND tb_propietarios_col_nombre = ?;
    `;

    try {
        const [resultsBusqueda] = await pool.execute(verificarExistenciaPacientes, [
            nombrePacienteConsulta,
            nombrePropietarioConsulta
        ]);

        let idMascota = null;

        if (resultsBusqueda.length) {
            idMascota = resultsBusqueda[0].idtb_pacientes;
        }

        const peticionConsulta = `
            INSERT INTO tb_consultageneral (
                tb_consultaGeneral_col_nombrePropietario, 
                tb_consultaGeneral_col_nombrePaciente,
                tb_consultaGeneral_col_motivo, 
                tb_consultaGeneral_col_medicamentosUtilizados, 
                tb_consultaGeneral_col_actualizacionPeso,
                tb_consultaGeneral_col_fecha, 
                tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
                tb_pacientes_idtb_pacientes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const [results] = await pool.execute(peticionConsulta, [nombrePropietarioConsulta,
            nombrePacienteConsulta, motivoConsulta,
            medicamentosConsulta, pesoConsultaGeneral,
            fechaAutomatica, idVeterinaria,
            idMascota // Si la mascota no existe, se insertará `NULL`
        ]);

        return results;
    } catch (error) {
        console.log("ERROR:M:ADMIN:CONSULTA: ", error)
        res.redirect('/?error=internalError');
    }
};


administracionModel.consultaVacunacion = async (nombrePropietarioVacunacion,
    nombrePacienteVacunacion, pesoVacunacion,
    nombreInyeccionVacunacion, nombreInyeccionDesparacitacion,
    fechaAutomatica,idVeterinaria,
) => {
    
    const verificarExistenciaPacientes = `SELECT  idtb_pacientes
    FROM tb_pacientes
    JOIN tb_propietarios
    ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
    WHERE tb_pacientes_col_nombre = ? AND tb_propietarios_col_nombre = ?;`;
    
    try{
        const [resultsBusqueda] = await pool.execute(verificarExistenciaPacientes, [
            nombrePacienteVacunacion, 
            nombrePropietarioVacunacion
        ])

        let idMascota = null;

        if(resultsBusqueda.length){
            idMascota = resultsBusqueda[0].idtb_pacientes;
        }

        const peticionConsulta = `INSERT INTO tb_consultavacunacion (tb_consultaVacunacion_col_nombrePropietario, 
        tb_consultaVacunacion_col_nombrePaciente, tb_consultaVacunacion_col_actualizacionPeso,
        tb_consultaVacunacion_col_vacunacion, tb_consultaVacunacion_col_desparacitacion,
        tb_consultaVacunacion_col_fecha,tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
        tb_pacientes_idtb_pacientes)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;

        const [results] = await pool.execute(peticionConsulta, [nombrePropietarioVacunacion,
            nombrePacienteVacunacion, pesoVacunacion,
            nombreInyeccionVacunacion, nombreInyeccionDesparacitacion,
            fechaAutomatica, idVeterinaria, idMascota]);

        return results

    }catch(error){
        console.log("ERROR:M:ADMIN:CONSULTAVAC: ", error)
        res.redirect('/?error=internalError');
    }
}

export default administracionModel;
