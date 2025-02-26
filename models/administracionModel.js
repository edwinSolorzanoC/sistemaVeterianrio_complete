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


    const queryDatosConsultas = `SELECT 
    tb_consultaGeneral_col_fecha, 
    tb_consultaGeneral_col_nombrePropietario,
    tb_consultaGeneral_col_nombrePaciente, 
    tb_consultaGeneral_col_motivo,
    tb_costosConsultas_col_total,
    tb_costosConsultas_col_medicamentos,
    tb_costosConsultas_col_extras,
    tb_costosConsultas_col_consultal,
    tb_costosConsultas_col_descripcion
    
    FROM tb_consultageneral
    
    JOIN tb_costosConsultas
    ON tb_consultageneral.idtb_consultaGeneral = tb_consultaGeneral_idtb_consultaGeneral
    
    WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? 
    ORDER BY tb_consultaGeneral_col_fecha DESC, idtb_consultaGeneral DESC
    LIMIT 5;`;

    try {
        const [results] = await pool.execute(queryDatosUsuario, [idVeterinaria]);
        const [resultsConsultas] = await pool.execute(queryDatosConsultas, [idVeterinaria]);

        return {results, resultsConsultas};
    } catch (error) {
        console.log("ERROR:M:ADMIN:START: ", error)
        res.redirect('/?error=internalError');
    }
};

administracionModel.actualizarDatosConsultas = async (idVeterinaria) => {

    try {
        const queryDatosConsultas = `SELECT 
        tb_consultaGeneral_col_fecha, 
        tb_consultaGeneral_col_nombrePropietario,
        tb_consultaGeneral_col_nombrePaciente,
        tb_costosConsultas_col_total,
        tb_costosConsultas_col_medicamentos,
        tb_costosConsultas_col_extras,
        tb_costosConsultas_col_consultal,
        tb_costosConsultas_col_descripcion
        
        FROM tb_consultageneral
        
        JOIN tb_costosConsultas
        ON tb_consultageneral.idtb_consultaGeneral = tb_consultaGeneral_idtb_consultaGeneral
        
        WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? 
        ORDER BY tb_consultaGeneral_col_fecha DESC, idtb_consultaGeneral DESC
        LIMIT 5;`;

    
        const [peticionConsultas] = await pool.execute(queryDatosConsultas, [idVeterinaria]);

        return {peticionConsultas};
    } catch (error) {
        console.log("ERROR:M:ADMIN:CONSULTA CONSULTAS: ", error)
        res.redirect('/?error=internalError');
    }


}

administracionModel.consultaGeneral = async (nombrePropietarioConsulta,
    nombrePacienteConsulta, motivoConsulta,
    medicamentosConsulta, pesoConsultaGeneral,
    fechaAutomatica, idVeterinaria, 
    costoMedicamentosGeneral, 
    costoExtrasGeneral, 
    costoServiciosGeneral, 
    costoDescripcionGeneral,
    costoTotalGeneral,
    costoTipoGeneral
) => {

    const conecction = await pool.getConnection();

    try{

        await conecction.beginTransaction();

        const verificarExistenciaPacientes = `
        SELECT idtb_pacientes
        FROM tb_pacientes
        JOIN tb_propietarios
        ON tb_propietarios.tb_propietarios_col_cedula = tb_pacientes.tb_propietarios_tb_propietarios_col_cedula
        WHERE tb_pacientes_col_nombre = ? AND tb_propietarios_col_nombre = ?;`;

        const [resultsBusqueda] = await pool.execute(verificarExistenciaPacientes, [
            nombrePacienteConsulta,
            nombrePropietarioConsulta
        ]);

        let idMascota = resultsBusqueda.length ? resultsBusqueda[0].idtb_pacientes : null;

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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        const [resultsConsulta] = await pool.execute(peticionConsulta, [
            nombrePropietarioConsulta, nombrePacienteConsulta, motivoConsulta,
            medicamentosConsulta, pesoConsultaGeneral, fechaAutomatica, idVeterinaria, idMascota
        ]);

        const idConsultaGeneral = resultsConsulta.insertId; // Obtener el ID de la consulta recién insertada
        const idConsultaVacunacion = null;
        const insertarCostos = `
        INSERT INTO tb_costosConsultas(
            tb_costosConsultas_col_medicamentos,
            tb_costosConsultas_col_extras, 
            tb_costosConsultas_col_consultal, 
            tb_costosConsultas_col_descripcion,
            tb_costosConsultas_col_total, 
            tb_costosConsultas_col_tipo, 
            tb_consultaGeneral_idtb_consultaGeneral,
            tb_consultaVacunacion_idtb_consultaVacunacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        await pool.execute(insertarCostos, [
            costoMedicamentosGeneral, 
            costoExtrasGeneral, 
            costoServiciosGeneral, 
            costoDescripcionGeneral, 
            costoTotalGeneral, 
            costoTipoGeneral,
            idConsultaGeneral,
            idConsultaVacunacion
        ]);


        await conecction.commit();
        conecction.release();

        return resultsConsulta;


    }catch(error){
       await conecction.rollback();
        conecction.release();
        console.log("ERROR:M:ADMIN:CONSULTA: ", error)
        res.redirect('/?error=internalError');

    }

};


administracionModel.consultaVacunacion = async (nombrePropietarioVacunacion,
    nombrePacienteVacunacion, pesoVacunacion,
    nombreInyeccionVacunacion, nombreInyeccionDesparacitacion,
    fechaAutomatica,idVeterinaria,
    costoMedicamentosVacunacion, 
    costoExtrasVacunacion, 
    costoServiciosVacunacion, 
    costoDescripcionVacunacion,
    costoTotalVacunacion,
    costoTipoVacunacion
) => {

    const conecction = await pool.getConnection();
    try{

        await conecction.beginTransaction();

        const verificarExistenciaPacientes = `SELECT  idtb_pacientes
        FROM tb_pacientes
        JOIN tb_propietarios
        ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
        WHERE tb_pacientes_col_nombre = ? AND tb_propietarios_col_nombre = ?;`;


        const [resultsBusqueda] = await pool.execute(verificarExistenciaPacientes, [
            nombrePacienteVacunacion, 
            nombrePropietarioVacunacion
        ])

        let idMascota = resultsBusqueda.length ? resultsBusqueda[0].idtb_pacientes : null;


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


        const idConsultaVacunacion = results.insertId;
        const idConsultaGeneral = null;
        const insertarCostos = `
        INSERT INTO tb_costosConsultas(
            tb_costosConsultas_col_medicamentos,
            tb_costosConsultas_col_extras, 
            tb_costosConsultas_col_consultal, 
            tb_costosConsultas_col_descripcion,
            tb_costosConsultas_col_total, 
            tb_costosConsultas_col_tipo, 
            tb_consultaGeneral_idtb_consultaGeneral,
            tb_consultaVacunacion_idtb_consultaVacunacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        await pool.execute(insertarCostos, [
            costoMedicamentosVacunacion, 
            costoExtrasVacunacion, 
            costoServiciosVacunacion, 
            costoDescripcionVacunacion,
            costoTotalVacunacion,
            costoTipoVacunacion,
            idConsultaGeneral,
            idConsultaVacunacion
        ]);

        
        await conecction.commit();
        conecction.release();

        return results;


    }catch(error){
        await conecction.rollback();
        conecction.release();
        console.log("ERROR:M:ADMIN:CONSULTAVAC: ", error)
        res.redirect('/?error=internalError');
        
    }

}

export default administracionModel;
