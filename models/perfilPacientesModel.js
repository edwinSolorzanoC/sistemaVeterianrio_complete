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

    const queryDatosPacientesYPropietarios = new Promise((resolve, reject) => {
        const peticionDatosUnicos = ` SELECT 
        tb_pacientes_col_nombre, 
        tb_pacientes_col_tipo, 
        tb_pacientes_col_raza, 
        tb_pacientes_col_fechaNacimiento,
        tb_pacientes_col_sexo,
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
        tb_propietarios_col_correoElectronico
    
        FROM tb_pacientes
    
        JOIN tb_propietarios 
        ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
    
        WHERE 
        tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ? AND
        tb_pacientes_col_nombre = ? AND
        tb_propietarios_col_nombre = ?;`

        connection.query(peticionDatosUnicos, [idVeterinaria, nombreMascota, nombrePropietario], (error, results) => {
            if (error) reject(error);
            resolve(results);
        });

    })

    const queryDatosConsultaGeneral = new Promise((resolve, reject) => {
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

            connection.query(peticionDatosConsultaGeneral, [idVeterinaria, nombreMascota, nombrePropietario], (error, results) => {
                if (error) reject(error);
                resolve(results);
            });

    })

    const queryDatosConsultaVacunacion = new Promise((resolve, reject)=> {
        const peticionVacunacion = `SELECT 
            tb_consultaVacunacion_col_fecha,
            tb_consultaVacunacion_col_desparacitacion,
            tb_consultaVacunacion_col_vacunacion
            
            FROM tb_consultaVacunacion
            
            JOIN tb_pacientes 
            ON tb_pacientes.idtb_pacientes = tb_consultaVacunacion.tb_pacientes_idtb_pacientes
            
            JOIN tb_propietarios
            ON tb_pacientes.tb_propietarios_tb_propietarios_col_cedula = tb_propietarios.tb_propietarios_col_cedula
            
            WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?
            AND tb_pacientes.tb_pacientes_col_nombre = ?
            AND tb_propietarios.tb_propietarios_col_nombre = ?;`

            connection.query(peticionVacunacion, [idVeterinaria, nombreMascota, nombrePropietario], (error, results) => {
                if (error) reject(error);
                resolve(results);
        });
    })

    Promise.all([queryDatosPacientesYPropietarios, queryDatosConsultaGeneral, queryDatosConsultaVacunacion])
        .then(results => {
            // results[0] -> Resultados de la primera consulta
            // results[1] -> Resultados de la segunda consulta
            // results[2] -> Resultados de la tercera consulta

            // console.log(results[0], results[1], results[2])
            // Pasar los resultados a través del callback
            callback(null, {
                datosPaciente: results[0],         // Datos del paciente y propietario
                consultasGenerales: results[1],    // Consultas generales
                vacunacion: results[2]             // Vacunación
            });
        }).catch(error => {
            callback(error);
        });

}

export default perfilPacientesModel;


