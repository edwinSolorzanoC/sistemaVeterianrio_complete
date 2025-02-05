import perfilPacientesModel from "../models/perfilPacientesModel.js";

const perfilPacientesController = {};

perfilPacientesController.inicioPerfilPacientes = async (req, res) => {
    const idVeterinaria = req.session.user.id;

    try{
        const results = await perfilPacientesModel.consultaInicio(idVeterinaria)
        res.render('perfilPacientes', {datos_pacientes: results})
    }catch(error){
        console.log("error al pedir los datos")
            res.redirect('/?error=internalError');
    }

}


perfilPacientesController.mostrarDatosSeleccionados = (req, res) => {
    const idVeterinaria = req.session.user.id;
    const { nombreMascota, nombrePropietario } = req.body;

    perfilPacientesModel.obtenerDatos(idVeterinaria, nombreMascota, nombrePropietario, (error, results) => {
        if (error) {
            console.log("Error al obtener los datos", error);
        } else {
            try {
                res.json({
                    datosPaciente: results.datosPaciente,         
                    consultasGenerales: results.consultasGenerales,   
                    vacunacion: results.vacunacion                 
                });
            } catch (err) {
                console.log("Error al procesar los datos", err);
                res.redirect('/?error=internalError');
            }
        }
    });
}

export default perfilPacientesController;