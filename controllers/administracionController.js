import administracionModel from "../models/administracionModel.js";

const administracionController = {};

administracionController.inicioAdministracion = async (req, res) => {
    const idVeterinaria = req.session.user.id; 

    try {
        // Llamada al modelo para obtener los datos
        const results = await administracionModel.consultaInicio(idVeterinaria);
        
        let alert = req.session.alert || { message: '¡Panel Administrativo!', type: 'success' };
        delete req.session.alert; // Borra la alerta después de usarla para que no se muestre repetidamente

        // Renderizar la vista con los resultados y la alerta
        res.render('administracion', {
            datos_pacientes: results,
            alert: alert // Pasar la alerta a la vista
        });
    } catch (error) {
        console.error("Error al obtener datos de pacientes y usuarios:", error);
        res.redirect('/?error=internalError');
    }
};

administracionController.insertarConsultaGeneral = (req, res) => {
    
    const {nombrePropietarioConsulta,
        nombrePacienteConsulta,
        motivoConsulta,
        medicamentosConsulta,
        pesoConsultaGeneral,
        fechaAutomatica = new Date().toISOString().slice(0, 10), // Formato: YYYY-MM-DD,
        idVeterinaria = req.session.user.id
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

                    req.session.alert = { message: '¡Consulta registrada exitosamente!', type: 'success' };
                    res.redirect('/administracion');

                } catch (errorRender) {
                    console.log(results)
                    console.log("Error al renderizar la página:", errorRender);
                    res.redirect('/?error=internalError');
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
        idVeterinaria = req.session.user.id
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
                    
                    req.session.alert = { message: '¡Consulta vacunacion registrada exitosamente!', type: 'success' };
                    res.redirect('/administracion');

                }catch(errorRender){
                    console.log(results)
                    console.log("Error al renderizar la página:", errorRender);
                    res.redirect('/?error=internalError');
                }
            }
        })

}

export default administracionController;