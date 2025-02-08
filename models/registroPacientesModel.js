import pool from "../config/conexion.js";

const registroPacientesModel = {};

registroPacientesModel.consultaInicio = async (idVeterinaria) => {

    if (!Number.isInteger(idVeterinaria)) {
        res.redirect('/?error=internalError');
        console.log("El ID de la veterinaria debe ser un número entero");
    }

    const peticion = `SELECT tb_propietarios_col_cedula, tb_propietarios_col_nombre 
    FROM tb_propietarios 
    WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = ?;`

    try{
        const [results] = await pool.execute(peticion, [idVeterinaria])
        return results
    }catch(error){
        console.error("Error en la consulta:", error.message);
    }
}

registroPacientesModel.insertarPropietario = async (cedulaPropietario, nombrePropietario, 
    direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria) => {
        
        const peticion = `INSERT INTO tb_propietarios 
        (tb_propietarios_col_cedula, tb_propietarios_col_nombre, tb_propietarios_col_direccion, tb_propietarios_col_numeroTelefono, 
        tb_propietarios_col_correoElectronico, tb_usuariosVeterinaria_idtb_usuariosVeterinaria) 
        VALUES (?, ?, ?, ?, ?, ?)`;

        try{
            const [results] = await pool.execute(peticion, [cedulaPropietario, nombrePropietario,
                direccionPropietario, telefonoPropietario, correoPropietario, idVeterinaria
            ])
            return results

        }catch(error){
            console.log("Error en peticion insercion model registro pacientes, insercion de propietario")
        }

}

registroPacientesModel.insertarMascota = async (nombreMascota, 
    tipoMascota, pesoMascota, 
    fechaNacimientoMascota, edadMascota,
    razaMascota,castracionMascota, 
    colorMascota, partosMascota, 
    fechaPartosMascota, sexoMascota,
    fechaConsultaMascota, idVeterinaria, 
    cedulaPropietarioMascota) => {

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

        try{
            const [results] = await pool.execute(peticion, [nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, edadMascota, razaMascota, castracionMascota, 
                colorMascota, partosMascota, fechaPartosMascota, sexoMascota, fechaConsultaMascota, idVeterinaria, cedulaPropietarioMascota
            ])

            return results
        }catch(error){
            console.log("Error en peticion insercion model registro pacientes, insercion de mascota", error)
        }

}

export default registroPacientesModel

