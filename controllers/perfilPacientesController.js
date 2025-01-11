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
export default perfilPacientesController;