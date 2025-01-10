import connection from "../config/conexion.js";

const inicioAdministracion = {};

inicioAdministracion.consulaUsuarioBaseDatos = (idVeterinaria, callback) => {
    const queryDatosUsuario = `SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre, tb_pacientes_col_fechaUltimaConsulta 
    FROM tb_pacientes 
    JOIN tb_propietarios 
    ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula 
    WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;`

    connection.query(queryDatosUsuario, [idVeterinaria], callback);

};

export default inicioAdministracion;
`
`