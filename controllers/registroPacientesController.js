import registroPacientesModel from "../models/registroPacientesModel.js";

const registroPacientesController = {};

registroPacientesController.inicioRegistroPacientes = (req, res) => {
    const idVeterinaria = req.session.user.id;

    registroPacientesModel.consultaInicio(idVeterinaria, (error, results) => {
        if (error) {
            res.redirect('/administracion')
        }else{
            try {

                let alert = req.session.alert || { message: '¡Panel registro pacientes!', type: 'success' };;
                delete req.session.alert; // Borra la alerta después de usarla para que no se muestre repetidamente
                
                res.render('registroPacientes', { datos_pacientes: results,  alert: alert });
            
            } catch (errorRender) {
                res.redirect('/')
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
                req.session.alert = { message: '¡Error al registrar propietario!', type: 'error' };
                res.redirect('/registroPacientes');
            } else {
                try {
                    req.session.alert = { message: '¡Propietario registrado exitosamente!', type: 'success' };
                    res.redirect('/registroPacientes');
                } catch (errorRender) {
                    res.redirect('/')
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
                req.session.alert = { message: '¡Error al registrar mascota!', type: 'error' };
                res.redirect('/registroPacientes');
            } else {
                try {
                    req.session.alert = { message: '¡Mascota registrada exitosamente!', type: 'success' };
                    res.redirect('/registroPacientes');
                } catch (errorRender) {
                    res.redirect('/')
                }
            }
        })

}

export default registroPacientesController;