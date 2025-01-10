import inicioAdministracion from "../models/administracionModel.js";

const consultaDatosUsuario = {};

consultaDatosUsuario.obtenerDatos = (req, res) => {
    const idVeterinaria = 1; //este datos ahorita es estatico pero se va a usar un manejo de sesion

    inicioAdministracion.consulaUsuarioBaseDatos(idVeterinaria, (error, results) => {

        try{

            res.render('administracion', {datos_pacientes: results})

        }catch(error){

            console.log("Error al obtener datos de pacienets y usuarios", error)
        }
    })

}

export default consultaDatosUsuario;