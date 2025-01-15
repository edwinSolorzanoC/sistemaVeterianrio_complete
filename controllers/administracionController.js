import administracionModel from "../models/administracionModel.js";

const administracionController = {};

administracionController.inicioAdministracion = (req, res) => {
    const idVeterinaria = 1; //este datos ahorita es estatico pero se va a usar un manejo de sesion

    administracionModel.consultaInicio(idVeterinaria, (error, results) => {

        try{

            res.render('administracion', {datos_pacientes: results})

        }catch(error){

            console.log("Error al obtener datos de pacienets y usuarios", error)
        }
    })

}


administracionController.insertarConsultaGeneral = (req, res) => {
    const {nombrePropietarioConsulta,
        nombrePacienteConsulta,
        motivoConsulta,
        medicamentosConsulta,
        pesoConsultaGeneral,
        fechaAutomatica = new Date().toISOString().slice(0, 10), // Formato: YYYY-MM-DD,
        idVeterinaria = 1
    } = req.body;

    administracionModel.consultaGeneral(nombrePropietarioConsulta,
        nombrePacienteConsulta,
        motivoConsulta,
        medicamentosConsulta,
        pesoConsultaGeneral,
        fechaAutomatica,
        idVeterinaria, (error, results) => {
            if (error) {
                console.log(results)
                console.log("Ocurrió un error al insertar consulta sin paciente.", error);
            } else {
                try {
                    console.log("Insercion de consulta sin paciente exitosa", results)
                    administracionController.inicioAdministracion(req, res);
                } catch (errorRender) {
                    console.log(results)
                    console.log("Error al renderizar la página:", errorRender);
                }
            }
        })
}

administracionController.insertaVacunacion = (req, res) => {

    const {nombrePropietarioVacunacion,
        nombrePacienteVacunacion,
        pesoVacunacion,
        nombreInyeccionVacunacion,
        nombreInyeccionDesparacitacion,
        fechaAutomatica = new Date().toISOString().slice(0, 10), // Formato: YYYY-MM-DD,,
        idVeterinaria = 1
    } = req.body;

    administracionModel.consultaVacunacion(nombrePropietarioVacunacion,
        nombrePacienteVacunacion,
        pesoVacunacion,
        nombreInyeccionVacunacion,
        nombreInyeccionDesparacitacion,
        fechaAutomatica,
        idVeterinaria, (error, results) => {
            if(error){
                console.log(results, "error en insertar vacunacion sin paciente", error);
            }else{
                try{
                    console.log("insercion de vacunascion sin paciente exitosa", results)
                    administracionController.inicioAdministracion(req,res);
                }catch(errorRender){
                    console.log(results)
                    console.log("Error al renderizar la página:", errorRender);
                }
            }
        })

}

export default administracionController;