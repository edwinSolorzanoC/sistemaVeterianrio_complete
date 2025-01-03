import conexion from '../config/conexion.js';

const insertarMascota = (nombreMascota, tipoMascota, pesoMascota,fechaNacimientoMascota , edadMascota,razaMascota,
    castracionMascota, colorMascota, partosMascota, fechaPartosMascota, idUsuarioActivoPredeterminado, cedulaPropietarioMascota, callback) => {
        
        console.log("DATOS QUE MANDAN EN LA CONSULTA: ", nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, edadMascota,razaMascota, castracionMascota,  colorMascota, partosMascota, fechaPartosMascota, idUsuarioActivoPredeterminado, cedulaPropietarioMascota);
        
        const query = 'INSERT INTO tb_pacientes (tb_pacientes_col_nombre, tb_pacientes_col_tipo, tb_pacientes_col_peso, tb_pacientes_col_fechaNacimiento, tb_pacientes_col_edad, tb_pacientes_col_raza, tb_pacientes_col_castrado, tb_pacientes_col_color, tb_pacientes_col_partos, tb_usuariosVeterinaria_idtb_usuariosVeterinaria, tb_propietarios_tb_propietarios_col_cedula) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        conexion.query(query, 
            [nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, edadMascota, razaMascota, castracionMascota, colorMascota, partosMascota, idUsuarioActivoPredeterminado, cedulaPropietarioMascota], 
            (error, results) => {

            if(error){
                console.log("ERROR EN LINEA 12 DE MASCOTAS.JS", error);
                return callback(error);

            }else{

                return callback(null, results);
            }
        });
    }

export { insertarMascota }
