import perfilPacientesModel from "../models/perfilPacientesModel.js";

const perfilPacientesController = {};

perfilPacientesController.inicioPerfilPacientes = (req, res) => {
    const idVeterinaria = 1;

    perfilPacientesModel.consultaInicio(idVeterinaria, (error, results) => {
            try{
                res.render('perfilPacientes',{datos_pacientes: results, paciente_solicitado: null})
            }catch{
                console.log("error al pedir los datos")
            }
        })
}



perfilPacientesController.mostrarDatosSeleccionados = (req, res) => {
    const idVeterinaria = 1;
    const {nombreMascota,nombrePropietario} = req.body;

    perfilPacientesModel.obtenerDatos(idVeterinaria, nombreMascota, nombrePropietario, (error, results) => {
        if(error){
            console.log("hay error", error)
        }else{
            try{
                res.render('perfilPacientes',{datos_pacientes: [],paciente_solicitado: results[0] || {}})
                
            }catch{
                console.log("error al pedir los datos")
            }
        }
        console.log("Lo que se envia a la vista es...", results[0] || {} )
        
    })
}
export default perfilPacientesController;