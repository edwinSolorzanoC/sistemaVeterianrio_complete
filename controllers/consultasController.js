import consultasModel from "../models/consultasModel.js";

const consultasController = {};

consultasController.inicioConsultas = (req, res) => {
    const idVeterinaria = req.session.user.id; 

    consultasModel.consultaInicio(idVeterinaria, (error, results) => {
        if (error) {
            console.error("Error en el controlador de consultas:", error);
            res.redirect("/");
        }

        try {
            res.render("consultas", {
                datosConsultaGeneral: results.datosConsultaGeneral,
                datosConsultaVacunacion: results.datosConsultaVacunacion,
            });
        } catch (err) {
            console.error("Error al renderizar la vista de consultas:", err);
            res.redirect("/");
        }
    });
};

export default consultasController;
