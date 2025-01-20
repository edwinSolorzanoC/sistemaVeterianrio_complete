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
                res.json(results[0]);
                console.log("Datos obtenidos para el paciente solicitado", results);
            } catch (err) {
                console.log("Error al procesar los datos", err);
            }
        }
    });
}

export default perfilPacientesController;