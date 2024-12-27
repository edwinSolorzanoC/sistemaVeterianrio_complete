import conexion from '../config/conexion.js';

const insertarMascota = (nombreMascota, tipoMascota, pesoMascota,edadMascota,razaMascota,
    castracionMascota, fechaNacimientoMascota, colorMascota, partosMascota, fechaPartosMascota,) => {
        
        console.log("Datos para la consulta:", nombreMascota, tipoMascota, pesoMascota,edadMascota,razaMascota, castracionMascota, fechaNacimientoMascota, colorMascota, partosMascota, fechaPartosMascota);
        const query = 'INSERT INTO tb_pacientes (tb_pacientes_col_nombre, tb_pacientes_col_tipo, tb_pacientes_col_peso, tb_pacientes_col_edad, tb_pacientes_col_raza, tb_pacientes_col_castrado, tb_pacientes_col_fechaNacimiento, tb_pacientes_col_color, tb_pacientes_col_partos, tb_pacientes_col_fechaPartos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        conexion.query(query, [nombreMascota, tipoMascota, pesoMascota,edadMascota,razaMascota, castracionMascota, fechaNacimientoMascota, colorMascota, partosMascota, fechaPartosMascota], (error, results) => {

            if(error){
                console.log("ERROR EN LINEA 12 DE MASCOTAS.JS");
                return callback(error);

            }else{

                return callback(null, results);
            }
        });
    }

export { insertarMascota }

/*
insert into tb_pacientes (
tb_pacientes_col_nombre, 
tb_pacientes_col_tipo,
tb_pacientes_col_peso,
tb_pacientes_col_edad,
tb_pacientes_col_raza,
tb_pacientes_col_castrado,
tb_pacientes_col_fechaNacimiento,
tb_pacientes_col_color,
tb_pacientes_col_partos,
tb_pacientes_col_fechaPartos,
tb_pacientes_col_fechaUltimaConsulta,
tb_usuariosVeterinaria_idtb_usuariosVeterinaria,
tb_propietarios_tb_propietarios_col_cedula) values (
"Chopper",
"Canino",
33,
2,
"Boxer",
"No",
'2022-11-16',
"Cafe",
0,
null,
null,
1,
20202020
);
*/