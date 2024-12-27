import express from 'express';
import connection from '../config/conexion.js';

const Router = express.Router();

Router.get('/perfilPacientes', (req, res) =>{

    const query = 'SELECT tb_pacientes_col_nombre, tb_propietarios_col_nombre FROM tb_pacientes JOIN tb_propietarios ON tb_propietarios_tb_propietarios_col_cedula = tb_propietarios_col_cedula WHERE tb_pacientes.tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;'

    connection.query(query, (error,result) => {
        if(error){
            console.log("Error en la consulta de administracion pacientes", error);
            return res.redirect('/');

        }else{
            res.render('perfilPacientes', {datos_pacientes: result});
        }
    });
});

export default Router;