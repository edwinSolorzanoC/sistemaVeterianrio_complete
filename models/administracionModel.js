import pool from "../config/conexion.js";

const administracionModel = {};

administracionModel.consultaInicio = (idVeterinaria, callback) => {

    if (!Number.isInteger(idVeterinaria)) {
        return callback(new Error("El ID de la veterinaria debe ser un número entero"));
    }

    const queryDatosUsuario = `SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre, tb_pacientes_col_fechaUltimaConsulta 
    FROM tb_pacientes 
    JOIN tb_propietarios 
    ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`

    pool.query(queryDatosUsuario, [idVeterinaria], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error.message);
            return callback(error); // Devuelve el error al cliente
        }

        // Si todo sale bien, devuelve los resultados
        callback(null, results);
    });
    
};

administracionModel.consultaGeneral = (nombrePropietarioConsulta,
    nombrePacienteConsulta,
    motivoConsulta,
    medicamentosConsulta,
    pesoConsultaGeneral,
    fechaAutomatica,
    idVeterinaria, callback) => {


        const verificarExistenciaPacientes = `SELECT  idtb_pacientes
        FROM tb_pacientes
        JOIN tb_propietarios
        ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
        WHERE tb_pacientes_col_nombre = ? && tb_propietarios_col_nombre = ?;`;

        pool.query(
            verificarExistenciaPacientes,
            [nombrePacienteConsulta,nombrePropietarioConsulta], 
            (error, results) => {

            if(error){

                console.log("error en la consulta de existencia de pacientes", error);

            } else{

                if(results.length > 0){

                    const idMascota = results[0].idtb_pacientes;

                    const peticionConMascota = `INSERT INTO tb_consultageneral (
                    tb_consultaGeneral_col_nombrePropietario, 
                    tb_consultaGeneral_col_nombrePaciente,
                    tb_consultaGeneral_col_motivo, 
                    tb_consultaGeneral_col_medicamentosUtilizados, 
                    tb_consultaGeneral_col_actualizacionPeso,
                    tb_consultaGeneral_col_fecha, 
                    tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
                    tb_pacientes_idtb_pacientes)
                    VALUES(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                    );`;
                    pool.query(peticionConMascota, [nombrePropietarioConsulta,
                        nombrePacienteConsulta,
                        motivoConsulta,
                        medicamentosConsulta,
                        pesoConsultaGeneral,
                        fechaAutomatica,
                        idVeterinaria,
                        idMascota], (err, results) => {
                            if(err){
                                console.log("Error en peticion model administracion, consulta con mascota", err)
                            }
                            callback(null, results)
                        });

                }else{

                    const peticion = `INSERT INTO tb_consultageneral (
                    tb_consultaGeneral_col_nombrePropietario, 
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
            
                    pool.query(peticion, [nombrePropietarioConsulta,
                        nombrePacienteConsulta,
                        motivoConsulta,
                        medicamentosConsulta,
                        pesoConsultaGeneral,
                        fechaAutomatica,
                        idVeterinaria], (err, results) => {
                            if(err){
                                console.log("Error en peticion model administracion, consulta sin mascota")
                            }
                            callback(null, results)
                        });;
                    
                }
            }
        })
        
        
}

administracionModel.consultaVacunacion = (
    nombrePropietarioVacunacion,
    nombrePacienteVacunacion,
    pesoVacunacion,
    nombreInyeccionVacunacion,
    nombreInyeccionDesparacitacion,
    fechaAutomatica,
    idVeterinaria, callback) => {

        const verificarExistenciaPacientes = `SELECT  idtb_pacientes
        FROM tb_pacientes
        JOIN tb_propietarios
        ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
        WHERE tb_pacientes_col_nombre = ? && tb_propietarios_col_nombre = ?;`;

        pool.query(verificarExistenciaPacientes, [nombrePacienteVacunacion, nombrePropietarioVacunacion], (error, results) =>{

            if(error){
                console.log("error en la consulta de existencia de pacientes");
            }else{
                if(results.length > 0){
                    const idMascota = results[0].idtb_pacientes;
                    const peticionConMascota = `INSERT INTO tb_consultavacunacion (
                        tb_consultaVacunacion_col_nombrePropietario, 
                        tb_consultaVacunacion_col_nombrePaciente,
                        tb_consultaVacunacion_col_actualizacionPeso,
                        tb_consultaVacunacion_col_vacunacion, 
                        tb_consultaVacunacion_col_desparacitacion,
                        tb_consultaVacunacion_col_fecha,
                        tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
                        tb_pacientes_idtb_pacientes)
                        VALUES(
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                        );`;
                
                        pool.query(peticionConMascota, [nombrePropietarioVacunacion,
                            nombrePacienteVacunacion,
                            pesoVacunacion,
                            nombreInyeccionVacunacion,
                            nombreInyeccionDesparacitacion,
                            fechaAutomatica,
                            idVeterinaria,
                            idMascota], (err, results) => {
                                if(err){
                                    console.log("Error en peticion model administracion, consulta vacunacion sin mascota")
                                }
                                callback(null, results)
                            });
                
                }else{
                    const peticion = `INSERT INTO tb_consultavacunacion (
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
                
                        pool.query(peticion, [nombrePropietarioVacunacion,
                            nombrePacienteVacunacion,
                            pesoVacunacion,
                            nombreInyeccionVacunacion,
                            nombreInyeccionDesparacitacion,
                            fechaAutomatica,
                            idVeterinaria], (err, results) => {
                                if(err){
                                    console.log("Error en peticion model administracion, consulta com mascota")
                                }
                                callback(null, results)
                            });
                }
                
            }
        })
        
        
        
        
}

export default administracionModel;
