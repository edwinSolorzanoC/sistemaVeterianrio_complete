import registroPacientesModel from "../models/registroPacientesModel.js";

const registroPacientesController = {};

registroPacientesController.inicioRegistroPacientes = (req, res) => {
    const idVeterinaria = req.session.user.id;

    registroPacientesModel.consultaInicio(idVeterinaria, (error, results) => {
        if (error) {
            console.log("Ocurrió un error al obtener los datos.", error);
        }else{
            try {
                res.render('registroPacientes', { datos_pacientes: results });
            } catch (errorRender) {
                console.log("Error al renderizar la página:", errorRender);
                console.log("Ocurrió un error al renderizar la página.");
            }
        }
        
    })
}

registroPacientesController.registrarPropietarios = (req, res) => {

    const {
        cedulaPropietario,
        nombrePropietario,
        direccionPropietario,
        telefonoPropietario,
        correoPropietario,
        idVeterinaria = req.session.user.id
    } = req.body;

    registroPacientesModel.insertarPropietario(
        cedulaPropietario,
        nombrePropietario,
        direccionPropietario,
        telefonoPropietario,
        correoPropietario,
        idVeterinaria, (error, results) => {
            if (error) {
                console.log("Ocurrió un error al insertar el propietario.", error);
            } else {
                try {
                    registroPacientesController.inicioRegistroPacientes(req, res);
                } catch (errorRender) {
                    console.log("Error al renderizar la página:", errorRender);
                }
            }
        })
}

registroPacientesController.registrarMascotas = (req, res) => {

    const {
        nombreMascota,
        tipoMascota,
        pesoMascota,
        fechaNacimientoMascota,
        edadMascota,
        razaMascota,
        castracionMascota,
        colorMascota,
        partosMascota,
        fechaPartosMascota,
        sexoMascota,
        fechaConsultaMascota  = new Date().toISOString().slice(0, 10),
        idVeterinaria = req.session.user.id,
        cedulaPropietarioMascota
    } = req.body;

    registroPacientesModel.insertarMascota(
        nombreMascota,
        tipoMascota,
        pesoMascota,
        fechaNacimientoMascota,
        edadMascota,
        razaMascota,
        castracionMascota,
        colorMascota,
        partosMascota || 0,
        fechaPartosMascota || null,
        sexoMascota,
        fechaConsultaMascota,
        idVeterinaria,
        cedulaPropietarioMascota,(error, results) => {
            if (error) {
                console.log(results)
                console.log("Ocurrió un error al insertar mascota.", error);
            } else {
                try {
                    console.log(results)
                    registroPacientesController.inicioRegistroPacientes(req, res);
                } catch (errorRender) {
                    console.log(results)
                    console.log("Error al renderizar la página:", errorRender);
                }
            }
        })

}

export default registroPacientesController;