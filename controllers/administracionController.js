import administracionModel from "../models/administracionModel.js";

const administracionController = {};

administracionController.inicioAdministracion = async (req, res) => {
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/?error=sesionError');
    }
    const idVeterinaria = req.session.user.id; 

    try {
        
        // Llamada al modelo para obtener los datos
        const results = await administracionModel.consultaInicio(idVeterinaria);
        
        // Renderizar la vista con los resultados y la alerta
        res.render('administracion', {datos_pacientes: results});
    } catch (error) {
        
        console.error("ERROR:ADMIN:STARTADMIN:", error);
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
        console.error("E:", error);
        console.log("ERROR:ADMIN:INSERTCONSULTA: ", error)
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
        console.log("ERROR:ADMIN:CONSULTAVAC: ", error)
        res.redirect('/administracion?error=internalError');
    }

}

export default administracionController;