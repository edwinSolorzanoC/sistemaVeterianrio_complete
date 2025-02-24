import pool from "../config/conexion.js";

const consultasModel = {}

consultasModel.consultaInicio = async (idVeterinaria) => {

    try{

        const peticionConsultaGeneral = `SELECT 
        tb_consultaGeneral_col_fecha, tb_consultaGeneral_col_nombrePropietario,
        tb_consultaGeneral_col_nombrePaciente, tb_consultaGeneral_col_motivo,
        tb_consultaGeneral_col_medicamentosUtilizados, tb_consultaGeneral_col_actualizacionPeso,
        tb_costosConsultas_col_total

        FROM tb_consultageneral

        JOIN tb_costosConsultas
        ON tb_consultageneral.idtb_consultaGeneral = tb_consultaGeneral_idtb_consultaGeneral

        WHERE 
        tb_pacientes_idtb_pacientes IS NULL 
        AND tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;

        const peticionConsultaVacunacion = `SELECT 
        tb_consultaVacunacion_col_fecha, tb_consultaVacunacion_col_nombrePaciente,
        tb_consultaVacunacion_col_nombrePropietario, tb_consultaVacunacion_col_vacunacion, 
        tb_consultaVacunacion_col_desparacitacion, tb_consultaVacunacion_col_actualizacionPeso
        ,tb_costosConsultas_col_total

        FROM tb_consultavacunacion
        
        JOIN tb_costosConsultas
        ON tb_consultavacunacion.idtb_consultaVacunacion = tb_consultaVacunacion_idtb_consultaVacunacion
        
        
        WHERE 
        tb_pacientes_idtb_pacientes IS NULL 
        AND tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`;


        const [resultsConsultaGeneral] = await pool.execute(peticionConsultaGeneral, [idVeterinaria])
        const [resultsConsultaVacunacion] = await pool.execute(peticionConsultaVacunacion, [idVeterinaria])

        return{
            resultsConsultaGeneral, resultsConsultaVacunacion
        }
    }catch(error){
        console.log("ERROR:M:CONSULTA:START: ", error)
        res.redirect('/?error=internalError');
    }

};

export default consultasModel;
