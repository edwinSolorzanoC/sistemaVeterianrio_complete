import pool from "../config/conexion.js";


const perfilPacientesModel = {};


perfilPacientesModel.consultaInicio = async (idVeterinaria) => {
    
    if (!Number.isInteger(idVeterinaria)) {
        res.redirect('/?error=internalError');
        console.log("ERROR:M:PERFIL:ID: ", error);
    }

    const peticion = `SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre 
    FROM tb_pacientes 
    JOIN tb_propietarios ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`

    try{
        const [results] = await pool.execute(peticion, [idVeterinaria]);
        return results;
    }catch(error){
        console.log("ERROR:M:PERFIL:START: ", error)
        res.redirect('/?error=internalError');
    }
}

perfilPacientesModel.obtenerDatos = async (idVeterinaria,nombreMascota,nombrePropietario) => {

    try{

        const peticionDatosUnicos = `  SELECT tb_pacientes_col_nombre, tb_pacientes_col_tipo, 
        tb_pacientes_col_raza,  tb_pacientes_col_fechaNacimiento,
        tb_pacientes_col_sexo,
        tb_pacientes_col_color,
        tb_pacientes_col_castrado,
        tb_pacientes_col_edad,
        tb_partos_col_cantidad,
        tb_partos_col_fechaParto,
        tb_pacientes_col_peso,
        tb_pacientes_col_fechaUltimaConsulta,
        tb_propietarios_col_nombre,
        tb_propietarios_col_cedula,
        tb_propietarios_col_direccion,
        tb_propietarios_col_numeroTelefono,
        tb_propietarios_col_correoElectronico
        FROM tb_pacientes
        JOIN tb_propietarios 
        ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
        LEFT JOIN tb_partos
        ON tb_pacientes.idtb_pacientes = tb_partos.tb_pacientes_idtb_pacientes
        WHERE 
        tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
        tb_pacientes_col_nombre = ? AND
        tb_propietarios_col_nombre = ? ;
`
        

        const peticionDatosConsultaGeneral = `SELECT 
            tb_consultaGeneral_col_fecha, 
            tb_consultaGeneral_col_motivo, 
            tb_consultaGeneral_col_medicamentosUtilizados
        
            FROM tb_consultageneral
        
            JOIN tb_pacientes 
            ON tb_pacientes.idtb_pacientes = tb_consultageneral.tb_pacientes_idtb_pacientes
        
            JOIN tb_propietarios
            ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
        
            WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
            AND tb_pacientes.tb_pacientes_col_nombre = ?
            AND tb_propietarios.tb_propietarios_col_nombre = ?;`
            

            const peticionVacunacion = `SELECT 
            tb_consultaVacunacion_col_fecha,
            tb_consultaVacunacion_col_desparacitacion,
            tb_consultaVacunacion_col_vacunacion
            
            FROM tb_consultavacunacion
            
            JOIN tb_pacientes 
            ON tb_pacientes.idtb_pacientes = tb_consultavacunacion.tb_pacientes_idtb_pacientes
            
            JOIN tb_propietarios
            ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
            
            WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
            AND tb_pacientes.tb_pacientes_col_nombre = ?
            AND tb_propietarios.tb_propietarios_col_nombre = ?;`
            
            const [datosPaciente] = await pool.execute(peticionDatosUnicos, [idVeterinaria, nombreMascota, nombrePropietario])
            const [consultasGenerales] = await pool.execute(peticionDatosConsultaGeneral, [idVeterinaria, nombreMascota, nombrePropietario])
            const [vacunacion] = await pool.execute(peticionVacunacion, [idVeterinaria, nombreMascota, nombrePropietario])

            return{
                datosPaciente,
                consultasGenerales,
                vacunacion
            }

    }catch(error){
        console.log("ERROR:M:PERFIL:GETDATES: ", error)
        res.redirect('/?error=internalError');
    }

}

export default perfilPacientesModel;