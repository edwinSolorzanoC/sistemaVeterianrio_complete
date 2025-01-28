import consultasModel from "../models/consultasModel.js";

const consultasController = {};

consultasController.inicioConsultas = (req, res) => {
    const idVeterinaria = req.session.user.id; 

    consultasModel.consultaInicio(idVeterinaria, (error, results) => {
        if (error) {
            console.error("Error en el controlador de consultas:", error);
            return res.status(500).json({
                message: "Ocurrió un error al obtener los datos de las consultas.",
                error,
            });
        }

        try {
            res.render("consultas", {
                datosConsultaGeneral: results.datosConsultaGeneral,
                datosConsultaVacunacion: results.datosConsultaVacunacion,
            });
        } catch (err) {
            console.error("Error al renderizar la vista de consultas:", err);
            res.status(500).json({
                message: "Ocurrió un error al renderizar la vista de consultas.",
                error: err,
            });
        }
    });
};

export default consultasController;
