import conexion from '../config/conexion.js';

const traerDatosPropietario = async (req, res) => {

    const query = 'SELECT tb_propietarios_col_cedula, tb_propietarios_col_nombre FROM tb_propietarios WHERE tb_usuariosVeterinaria_idtb_usuariosVeterinaria = 1;'

    conexion.query(query, (error,result) => {
        if(error){
            console.log("Error en la consulta de administracion pacientes", error);
            return res.redirect('/');

        }else{
            res.render('registroPacientes', {datos_pacientes: result});
        }
    });

}
export default traerDatosPropietario;