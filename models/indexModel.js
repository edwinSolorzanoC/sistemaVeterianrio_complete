import pool from "../config/conexion.js";

const indexModel = {};

// Método para consultar un usuario por su nombre de usuario
indexModel.consultaBaseDatos = async (username) => {

  const query = `
  SELECT 
  idtb_usuariosVeterinaria, 
  tb_usuariosVeterinaria_col_usuario, 
  tb_usuariosVeterinaria_col_contrasenna 
  
  FROM tb_usuariosveterinaria
  
  WHERE tb_usuariosVeterinaria_col_usuario = ?;`;
  
  try {
    const [results] = await pool.execute(query, [username]);
    return results;

  } catch (err) {
    res.redirect('/?error=internalError');
  }

};


indexModel.crearUsuario = async (nombreUsuario, nombreSistema,
  password, correoElectronico,
  numeroTelefono, direccion,
  claveSeguridad
  ) => {
    
    const crearUsuario = `UPDATE tb_usuariosveterinaria
    SET
    tb_usuariosVeterinaria_col_nombre = ?,
    tb_usuariosVeterinaria_col_usuario = ?,
    tb_usuariosVeterinaria_col_contrasenna = ?,
    tb_usuariosVeterinaria_col_correoElectronico = ?,
    tb_usuariosVeterinaria_col_numeroTelefono = ?,
    tb_usuariosVeterinaria_col_direccion = ?
    WHERE tb_usuariosVeterinaria_col_claveSeguraidad = ?;
    `;

    try{

      const [results] = await pool.execute(crearUsuario, [nombreUsuario,
        nombreSistema, password,
        correoElectronico, numeroTelefono,
        direccion, claveSeguridad]);

        if(results.affectedRows === 0){
          return {error: "invalidKey"}
        }

        return results
    }catch(error){
      res.redirect('/?error=internalError');
    }
  
  };

  indexModel.actualizarContrasenna = async (claveSeguridadRes, usernameRes, passwordRes) => {
    const queryActualizar = `UPDATE tb_usuariosveterinaria
    SET tb_usuariosVeterinaria_col_contrasenna = ?
    WHERE tb_usuariosVeterinaria_col_claveSeguraidad = ?
    AND tb_usuariosVeterinaria_col_usuario = ?`;

    try{

      const [results] = await pool.execute(queryActualizar, [passwordRes, claveSeguridadRes, usernameRes]);
      
      return results

    }catch(error){
      res.redirect('/?error=internalError');
    }
};

    



export default indexModel;
