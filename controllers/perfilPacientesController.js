import perfilPacientesModel from "../models/perfilPacientesModel.js";

const perfilPacientesController = {};

perfilPacientesController.inicioPerfilPacientes = async (req, res) => {
    const idVeterinaria = req.session.user.id;

    try{
        const results = await perfilPacientesModel.consultaInicio(idVeterinaria)
        res.render('perfilPacientes', {datos_pacientes: results})
    }catch(error){
        console.log("ERROR:PERFIL:START: ", error)
            res.redirect('/?error=internalError');
    }

}


perfilPacientesController.mostrarDatosSeleccionados = async (req, res) => {
    const idVeterinaria = req.session.user.id;
    const { nombreMascota, nombrePropietario } = req.body;

    try{
        const results = await perfilPacientesModel.obtenerDatos(idVeterinaria, nombreMascota, nombrePropietario)

        res.json({
            datosPaciente: results.datosPaciente,         
            consultasGenerales: results.consultasGenerales,   
            vacunacion: results.vacunacion                 
        });
    }catch(error){
        onsole.log("ERROR:PERFIL:SHOWDATES: ", error);
        res.redirect('/?error=internalError');
    }
   
}

export default perfilPacientesController;