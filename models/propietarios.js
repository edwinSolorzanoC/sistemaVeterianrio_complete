import conexion from '../config/conexion.js';


const insertarPropietario = (cedulaPropietario, nombrePropietario, direccionPropietario, telefonoPropietario, correoPropietario, idUsuarioActivoPredeterminado, callback) => {

    console.log("Datos para la consulta:", cedulaPropietario, nombrePropietario, direccionPropietario, telefonoPropietario, correoPropietario, idUsuarioActivoPredeterminado);

    const query = 'INSERT INTO tb_propietarios (tb_propietarios_col_cedula, tb_propietarios_col_nombre, tb_propietarios_col_direccion, tb_propietarios_col_numeroTelefono, tb_propietarios_col_correoElectronico, tb_usuariosVeterinaria_idtb_usuariosVeterinaria) VALUES (?, ?, ?, ?, ?, ?)';

    conexion.query(query, [cedulaPropietario, nombrePropietario, direccionPropietario, telefonoPropietario, correoPropietario, idUsuarioActivoPredeterminado], (error, results) => {

        if(error){
            console.log("ERROR EN LINEA 12 DE PROPIETARIOS.JS");
            return callback(error);

        }else{

            return callback(null, results);
        }
    });
}

export {insertarPropietario}



/*

insert into tb_propietarios (
tb_propietarios_col_cedula,
tb_propietarios_col_nombre,
tb_propietarios_col_direccion,
tb_propietarios_col_numeroTelefono,
tb_propietarios_col_correoElectronico,
tb_usuariosVeterinaria_idtb_usuariosVeterinaria
) value (
208470215,
"Edwin Gerardo Solorzano Campos",
"Atenas, San Isidro, 50 metros oeste de la antigua escuela pavas",
60263229,
"edwinuni26@gmail.com",
1
);



*/