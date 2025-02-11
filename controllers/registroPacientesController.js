import registroPacientesModel from "../models/registroPacientesModel.js";

const registroPacientesController = {};

registroPacientesController.inicioRegistroPacientes = async (req, res) => {
    if (!req.session || !req.session.user || !req.session.user.id) {
        return res.redirect('/?error=sesionError');
    }
    const idVeterinaria = req.session.user.id;

    try{

        const results = await registroPacientesModel.consultaInicio(idVeterinaria);
        
        let alert = req.session.alert || { message: '¡Panel registro pacientes!', type: 'success' };;
        delete req.session.alert; // Borra la alerta después de usarla para que no se muestre repetidamente
        
        res.render('registroPacientes', {
            datos_pacientes: results,
            alert: alert
        });

    }catch(error){
        console.log("ERROR:REGISTRO:START: ", error)
        res.redirect('/?error=internalError');
    }

}

registroPacientesController.registrarPropietarios = async (req, res) => {

    const {
        cedulaPropietario,
        nombrePropietario,
        direccionPropietario,
        telefonoPropietario,
        correoPropietario,
        idVeterinaria = req.session.user.id
    } = req.body;

    try{

        const results = await registroPacientesModel.insertarPropietario(cedulaPropietario,
            nombrePropietario,
            direccionPropietario,
            telefonoPropietario,
            correoPropietario,
            idVeterinaria
        );
        return res.redirect('/registroPacientes?success=newRegister')
    }catch(error){
        console.log("ERROR:REGISTRO:REGISTRAR: ", error)
        return res.redirect('/registroPacientes?error=internalError')
    }
}

registroPacientesController.registrarMascotas = async (req, res) => {

    try{
        const {
            nombreMascota,tipoMascota,
            pesoMascota, fechaNacimientoMascota,
            edadMascota, razaMascota, castracionMascota,
            colorMascota, partosMascota, fechaPartosMascota,
            sexoMascota, fechaConsultaMascota  = new Date().toISOString().slice(0, 10),
            idVeterinaria = req.session.user.id, cedulaPropietarioMascota
        } = req.body;
    
        const results = await registroPacientesModel.insertarMascota(
            nombreMascota, tipoMascota, pesoMascota,
            fechaNacimientoMascota, edadMascota,
            razaMascota, castracionMascota, colorMascota,
            partosMascota || 0, fechaPartosMascota || null,
            sexoMascota, fechaConsultaMascota,
            idVeterinaria, cedulaPropietarioMascota
        )
        return res.redirect('/registroPacientes?success=newRegister')

    }catch(error){
        console.log("ERROR:REGISTRO:REGISTRAR: ", error)
        return res.redirect('/registroPacientes?error=internalError')
    }
    

}

export default registroPacientesController;