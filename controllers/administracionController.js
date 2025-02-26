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
        res.render('administracion', {datos_pacientes: results.results, datos_consultas: results.resultsConsultas});
    } catch (error) {
        
        console.error("ERROR:C:ADMIN:STARTADMIN:", error);
        res.redirect('/?error=internalError');
    }
};

administracionController.actualizarDatosConsultas = async (req, res) => {

    const idVeterinaria = req.session.user.id; 

    try{
        const { peticionConsultas } = await administracionModel.actualizarDatosConsultas(idVeterinaria);
        res.json({
            peticionConsultas
        })
        
    }catch(error){
        console.error("ERROR:C:ADMIN:ACTCONSULTA:", error);
        res.redirect('/?error=internalError');
    }
}

administracionController.insertarConsultaGeneral = async (req, res) => {
    
    const {nombrePropietarioConsulta,
        nombrePacienteConsulta,
        motivoConsulta,
        medicamentosConsulta,
        pesoConsultaGeneral,
        idVeterinaria = req.session.user.id,
        costoMedicamentosGeneral, 
        costoExtrasGeneral, 
        costoServiciosGeneral, 
        costoDescripcionGeneral
    } = req.body;

    const fechaAutomatica = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD,

    const ScostoMedicamentosGeneral = Number(costoMedicamentosGeneral) || 0;
    const ScostoExtrasGeneral = Number(costoExtrasGeneral) || 0;
    const ScostoServiciosGeneral = Number(costoServiciosGeneral) || 0;
    
    const costoTotalGeneral = ScostoExtrasGeneral + ScostoMedicamentosGeneral + ScostoServiciosGeneral;

    const costoTipoGeneral = "Consulta General"
    try{

        const results = await administracionModel.consultaGeneral(
            nombrePropietarioConsulta,
            nombrePacienteConsulta,motivoConsulta,
            medicamentosConsulta, pesoConsultaGeneral,
            fechaAutomatica,idVeterinaria, 
            costoMedicamentosGeneral, 
            costoExtrasGeneral, 
            costoServiciosGeneral, 
            costoDescripcionGeneral,
            costoTotalGeneral,
            costoTipoGeneral
        );
        return res.redirect('/administracion?success=consultaUpdate');

    }catch(error){
        console.log("ERROR:C:ADMIN:INSERTCONSULTA: ", error)
        res.redirect('/administracion?error=internalError');
    }
    
}

administracionController.insertaVacunacion = async (req, res) => {
    const {nombrePropietarioVacunacion,
        nombrePacienteVacunacion,
        pesoVacunacion, 
        nombreInyeccionVacunacion,
        nombreInyeccionDesparacitacion, 
        idVeterinaria = req.session.user.id,
        costoMedicamentosVacunacion,
        costoExtrasVacunacion,
        costoServiciosVacunacion,
        costoDescripcionVacunacion
    } = req.body;

    const ScostoMedicamentosVacunacion = Number(costoMedicamentosVacunacion) || 0;
    const ScostoExtrasVacunacion = Number(costoExtrasVacunacion) || 0;
    const ScostoServiciosVacunacion = Number(costoServiciosVacunacion) || 0;

    const costoTotalVacunacion = ScostoMedicamentosVacunacion + ScostoExtrasVacunacion + ScostoServiciosVacunacion;

    const fechaAutomatica = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD

    const costoTipoVacunacion = "Consulta Vacunacion"


    try{

        const results = await administracionModel.consultaVacunacion(nombrePropietarioVacunacion, nombrePacienteVacunacion,
            pesoVacunacion, nombreInyeccionVacunacion,
            nombreInyeccionDesparacitacion, fechaAutomatica,
            idVeterinaria,
            costoMedicamentosVacunacion, 
            costoExtrasVacunacion, 
            costoServiciosVacunacion, 
            costoDescripcionVacunacion,
            costoTotalVacunacion,
            costoTipoVacunacion
        )
        return res.redirect('/administracion?success=consultaUpdate');

    }catch(error){
        console.log("ERROR:ADMIN:CONSULTAVAC: ", error)
        res.redirect('/administracion?error=internalError');
    }

}

export default administracionController;