import perfilPacientesModel from "../models/perfilPacientesModel.js";

const perfilPacientesController = {};

perfilPacientesController.inicioPerfilPacientes = (req, res) => {
    const idVeterinaria = 1;

    perfilPacientesModel.consultaInicio(idVeterinaria, (error, results) => {
            try{
                res.render('perfilPacientes',{datos_pacientes: results})
            }catch{
                console.log("error al pedir los datos")
            }
        })
}


perfilPacientesController.mostrarDatosSeleccionados = (req, res) => {
    const idVeterinaria = 1;
    const { nombreMascota, nombrePropietario } = req.body;

    perfilPacientesModel.obtenerDatos(idVeterinaria, nombreMascota, nombrePropietario, (error, results) => {
        if (error) {
            console.log("Error al obtener los datos", error);
        } else {
            try {
                // Pasamos los datos a la vista
                // console.log("CONTORLADOR : ", results.datosPaciente, results.consultasGenerales, results.vacunacion )
                res.json({
                    datosPaciente: results.datosPaciente,         // Datos del paciente y propietario
                    consultasGenerales: results.consultasGenerales,    // Consultas generales
                    vacunacion: results.vacunacion                 // Vacunación
                });
            } catch (err) {
                console.log("Error al procesar los datos", err);
            }
        }
    });
}

export default perfilPacientesController;