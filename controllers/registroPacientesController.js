import registroPacientesModel from "../models/registroPacientesModel.js";

const registroPacientesController = {};

registroPacientesController.inicioRegistroPacientes = (req, res) => {
    const idVeterinaria = 1;

    registroPacientesModel.consultaInicio(idVeterinaria, (error, results) => {
        try{
            res.render('registroPacientes',{datos_pacientes: results})
        }catch{
            console.log("error al pedir los datos")
        }
    })
}

export default registroPacientesController;