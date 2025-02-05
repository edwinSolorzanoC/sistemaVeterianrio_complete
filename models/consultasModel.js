import pool from "../config/conexion.js";

const consultasModel = {}

consultasModel.consultaInicio = (idVeterinaria) => {
    const queryConsultaGeneral = new Promise((resolve, reject) => {
        const peticionDatos = `
            SELECT 
                tb_consultaGeneral_col_fecha,
                tb_consultaGeneral_col_nombrePropietario,
                tb_consultaGeneral_col_nombrePaciente,
                tb_consultaGeneral_col_motivo,
                tb_consultaGeneral_col_medicamentosUtilizados,
                tb_consultaGeneral_col_actualizacionPeso
            FROM 
                tb_consultageneral
            WHERE 
                tb_pacientes_idtb_pacientes IS NULL 
                AND tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;
        
                pool.query(peticionDatos, [idVeterinaria], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });

    const queryConsultaVacunacion = new Promise((resolve, reject) => {
        const peticionDatos = `
            SELECT 
                tb_consultaVacunacion_col_fecha,
                tb_consultaVacunacion_col_nombrePaciente,
                tb_consultaVacunacion_col_nombrePropietario,
                tb_consultaVacunacion_col_vacunacion,
                tb_consultaVacunacion_col_desparacitacion,
                tb_consultaVacunacion_col_actualizacionPeso
            FROM 
                tb_consultavacunacion
            WHERE 
                tb_pacientes_idtb_pacientes IS NULL 
                AND tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;
        
                pool.query(peticionDatos, [idVeterinaria], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });

    Promise.all([queryConsultaGeneral, queryConsultaVacunacion])
        .then(results => {
            callback(null, {
                datosConsultaGeneral: results[0],
                datosConsultaVacunacion: results[1]
            });
        })
        .catch(error => {
            callback(error);
        });
};

export default consultasModel;
