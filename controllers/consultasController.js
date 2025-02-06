import consultasModel from "../models/consultasModel.js";

const consultasController = {};

consultasController.inicioConsultas = async (req, res) => {
    const idVeterinaria = req.session.user.id; 

    try{
        const results = await consultasModel.consultaInicio(idVeterinaria)
        
        res.render("consultas", {
            datosConsultaGeneral: results.resultsConsultaGeneral,
            datosConsultaVacunacion: results.resultsConsultaVacunacion,
        });

    }catch(error){
        console.log("Error en el controller consultas")
    }
};

export default consultasController;
