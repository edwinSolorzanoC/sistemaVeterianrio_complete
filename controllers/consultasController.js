import consultasModel from "../models/consultasModel.js";

const consultasController = {};

consultasController.inicioConsultas = async (req, res) => {
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/?error=sesionError');
    }
    const idVeterinaria = req.session.user.id; 

    try{
        const results = await consultasModel.consultaInicio(idVeterinaria)
        
        res.render("consultas", {
            datosConsultaGeneral: results.resultsConsultaGeneral,
            datosConsultaVacunacion: results.resultsConsultaVacunacion,
        });

    }catch(error){
        console.log("ERROR:CONSULTAS:START: ", error)
        res.redirect('/administracion?error=internalError');
    }
};

export default consultasController;
