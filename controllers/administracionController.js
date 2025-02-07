import administracionModel from "../models/administracionModel.js";

const administracionController = {};

administracionController.inicioAdministracion = async (req, res) => {
    const idVeterinaria = req.session.user.id; 

    try {
        // Llamada al modelo para obtener los datos
        const results = await administracionModel.consultaInicio(idVeterinaria);
        
        // Renderizar la vista con los resultados y la alerta
        res.render('administracion', {datos_pacientes: results});
    } catch (error) {
        console.error("Error al obtener datos de pacientes y usuarios:", error);
        res.redirect('/?error=internalError');
    }
};

administracionController.insertarConsultaGeneral = async (req, res) => {
    
    const {nombrePropietarioConsulta,
        nombrePacienteConsulta,
        motivoConsulta,
        medicamentosConsulta,
        pesoConsultaGeneral,
        fechaAutomatica = new Date().toISOString().slice(0, 10), // Formato: YYYY-MM-DD,
        idVeterinaria = req.session.user.id
    } = req.body;

    try{

        const results = await administracionModel.consultaGeneral(nombrePropietarioConsulta,
            nombrePacienteConsulta,motivoConsulta,
            medicamentosConsulta, pesoConsultaGeneral,
            fechaAutomatica,idVeterinaria
        );
        return res.redirect('/administracion?success=consultaUpdate');

    }catch(error){
        console.log("Error al realizar consulta")
        res.redirect('/administracion?error=internalError');
    }
    
}

administracionController.insertaVacunacion = async (req, res) => {
    const {nombrePropietarioVacunacion,nombrePacienteVacunacion,
        pesoVacunacion, nombreInyeccionVacunacion,
        nombreInyeccionDesparacitacion, fechaAutomatica = new Date().toISOString().slice(0, 10), // Formato: YYYY-MM-DD,,
        idVeterinaria = req.session.user.id
    } = req.body;

    try{

        const results = await administracionModel.consultaVacunacion(nombrePropietarioVacunacion, nombrePacienteVacunacion,
            pesoVacunacion, nombreInyeccionVacunacion,
            nombreInyeccionDesparacitacion, fechaAutomatica,
            idVeterinaria
        )
        return res.redirect('/administracion?success=consultaUpdate');

    }catch(error){
        res.redirect('/administracion?error=internalError');
    }

}

export default administracionController;