import conexion from '../config/conexion.js';

const insertarMascota = (nombreMascota, tipoMascota, pesoMascota,edadMascota,razaMascota,
    castracionMascota, fechaNacimientoMascota, colorMascota, partosMascota, fechaPartosMascota,) => {
        
        console.log("Datos para la consulta:", nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, edadMascota,razaMascota, castracionMascota,  colorMascota, partosMascota, fechaPartosMascota);
        const query = 'INSERT INTO tb_pacientes (tb_pacientes_col_nombre, tb_pacientes_col_tipo, tb_pacientes_col_peso, tb_pacientes_col_fechaNacimiento, tb_pacientes_col_edad, tb_pacientes_col_raza, tb_pacientes_col_castrado, tb_pacientes_col_color, tb_pacientes_col_partos, tb_pacientes_col_fechaPartos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        conexion.query(query, 
            [nombreMascota, tipoMascota, pesoMascota, fechaNacimientoMascota, edadMascota,razaMascota, castracionMascota, colorMascota, partosMascota, fechaPartosMascota], 
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
