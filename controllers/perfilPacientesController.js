import perfilPacientesModel from "../models/perfilPacientesModel.js";

const perfilPacientesController = {};

perfilPacientesController.inicioPerfilPacientes = (req, res) => {
    const idVeterinaria = req.session.user.id;

    perfilPacientesModel.consultaInicio(idVeterinaria, (error, results) => {
        if(error){
            console.log("Error en el contorller/perfilpacientes/inico de panel")
        }
        try{
            res.render('perfilPacientes',{datos_pacientes: results})
        }catch{
            console.log("error al pedir los datos")
            res.redirect('/?error=internalError');
        }
    })
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