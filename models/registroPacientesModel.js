import connection from "../config/conexion.js";

const registroPacientesModel = {};

registroPacientesModel.consultaInicio = (idVeterinaria, callback) => {
    const peticion = `SELECT tb_propietarios_col_cedula, tb_propietarios_col_nombre 
    FROM tb_propietarios 
    WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;`

    connection.query(peticion, [idVeterinaria], callback);
}

registroPacientesModel.insertarPropietario = (cedulaPropietario, nombrePropietario, 
    direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria, callback) => {

        const peticion = `INSERT INTO tb_propietarios 
        (tb_propietarios_col_cedula, tb_propietarios_col_nombre, tb_propietarios_col_direccion, tb_propietarios_col_numeroTelefono, 
        tb_propietarios_col_correoElectronico, tb_usuariosVeterinaria_idtb_usuariosVeterinaria) 
        VALUES (?, ?, ?, ?, ?, ?)`;

        connection.query(peticion, [cedulaPropietario, nombrePropietario, 
            direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria], callback);

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
        tb_pacientes_col_fechaUltimaConsulta,
        tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
        tb_propietarios_tb_propietarios_col_cedula) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        connection.query(peticion, [nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, edadMascota, razaMascota, castracionMascota, 
            colorMascota, partosMascota, fechaPartosMascota,fechaConsultaMascota, idVeterinaria, cedulaPropietarioMascota], callback);


}

export default registroPacientesModel

