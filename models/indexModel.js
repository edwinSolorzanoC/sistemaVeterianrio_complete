import connection from '../config/conexion.js';

const indexModel = {};

// Método para consultar un usuario por su nombre de usuario
indexModel.consultaBaseDatos = (username, callback) => {
  const query = `
  SELECT 
  idtb_usuariosVeterinaria, 
  tb_usuariosVeterinaria_col_usuario, 
  tb_usuariosVeterinaria_col_contrasenna 
  
  FROM tb_usuariosVeterinaria 
  
  WHERE tb_usuariosVeterinaria_col_usuario = ?;`;
  
  connection.query(query, [username], (err, results) => {
    if(err){
      console.log("Error en peticion model index")
    }
    callback(null, results)
  });
};

indexModel.crearUsuario = (
    nombreUsuario,
    nombreSistema,
    password,
    correoElectronico,
    numeroTelefono,
    direccion,
    claveSeguridad,
    callback
  ) => {
    const crearUsuario = `
      UPDATE tb_usuariosVeterinaria
      SET
        tb_usuariosVeterinaria_col_nombre = ?,
        tb_usuariosVeterinaria_col_usuario = ?,
        tb_usuariosVeterinaria_col_contrasenna = ?,
        tb_usuariosVeterinaria_col_correoElectronico = ?,
        tb_usuariosVeterinaria_col_numeroTelefono = ?,
        tb_usuariosVeterinaria_col_direccion = ?
      WHERE tb_usuariosVeterinaria_col_claveSeguraidad = ?;
    `;

    connection.query(crearUsuario, [
        nombreUsuario,
        nombreSistema,
        password,
        correoElectronico,
        numeroTelefono,
        direccion,
        claveSeguridad], (err, results) => {
          if(err){
              console.log("Error en peticion insercion model index, insercion registor de usuario")
          }
          
           // Verificamos si no se afectó ninguna fila
        if (results.affectedRows === 0) {
          return callback(null, { error: "invalidKey" });
      }
      
      
      callback(null, results);
    
    });
  
  };

  indexModel.actualizarContrasenna = (claveSeguridadRes, usernameRes, passwordRes, callback) => {
    const queryActualizar = `
        UPDATE tb_usuariosveterinaria
        SET tb_usuariosVeterinaria_col_contrasenna = ?
        WHERE tb_usuariosVeterinaria_col_claveSeguraidad = ?
        AND tb_usuariosVeterinaria_col_usuario = ?
    `;

    connection.query(queryActualizar, [passwordRes, claveSeguridadRes, usernameRes], (err, results) => {
        if (err) {
            console.error("Error al actualizar contraseña:", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

    



export default indexModel;
