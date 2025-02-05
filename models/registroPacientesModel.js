import pool from "../config/conexion.js";

const registroPacientesModel = {};

registroPacientesModel.consultaInicio = (idVeterinaria, callback) => {
    const peticion = `SELECT tb_propietarios_col_cedula, tb_propietarios_col_nombre 
    FROM tb_propietarios 
    WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`

    pool.query(peticion, [idVeterinaria], (err, results) => {
        if(err){
            console.log("Error en peticion model registorPacientes, consulta inicio")
        }
        callback(null, results)
    });
}

registroPacientesModel.insertarPropietario = (cedulaPropietario, nombrePropietario, 
    direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria, callback) => {

        const peticion = `INSERT INTO tb_propietarios 
        (tb_propietarios_col_cedula, tb_propietarios_col_nombre, tb_propietarios_col_direccion, tb_propietarios_col_numeroTelefono, 
        tb_propietarios_col_correoElectronico, tb_usuariosVeterinaria_idtb_usuariosVeterinaria) 
        VALUES (?, ?, ?, ?, ?, ?)`;

        pool.query(peticion, [cedulaPropietario, nombrePropietario, 
            direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria], (err, results) => {
                if(err){
                    console.log("Error en peticion insercion model registro pacientes, insercion de propietario")
                }
                callback(null, results)
            });

}

registroPacientesModel.insertarMascota = (
    nombreMascota, 
    tipoMascota, 
    pesoMascota, 
    fechaNacimientoMascota, 
    edadMascota,
    razaMascota,
    castracionMascota, 
    colorMascota, 
    partosMascota, 
    fechaPartosMascota, 
    sexoMascota,
    fechaConsultaMascota,
    idVeterinaria, 
    cedulaPropietarioMascota, callback) => {

        const peticion = `INSERT INTO tb_pacientes 
        (tb_pacientes_col_nombre, 
        tb_pacientes_col_tipo,
        tb_pacientes_col_peso,
        tb_pacientes_col_fechaNacimiento,
        tb_pacientes_col_edad,
        tb_pacientes_col_raza,
        tb_pacientes_col_castrado,
        tb_pacientes_col_color,
        tb_pacientes_col_partos,
        tb_pacientes_col_fechaPartos,
        tb_pacientes_col_sexo,
        tb_pacientes_col_fechaUltimaConsulta,
        tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
        tb_propietarios_tb_propietarios_col_cedula) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        pool.query(peticion, [nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, edadMascota, razaMascota, castracionMascota, 
            colorMascota, partosMascota, fechaPartosMascota, sexoMascota, fechaConsultaMascota, idVeterinaria, cedulaPropietarioMascota], (err, results) => {
                if(err){
                    console.log("Error en peticion insercion model registro pacientes, insercion de mascota")
                }
                callback(null, results)
            });


}

export default registroPacientesModel

