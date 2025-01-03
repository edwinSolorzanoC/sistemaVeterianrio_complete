import indexModel from '../models/indexModel.js';

const ingresarSistema = async (req, res) => {

    try{
        const { usuario, contrasenna } = req.body;

        const datosAgrupados = {
            usuario,
            contrasenna
        }
        const resultadoFormulario = await indexModel.validarDatos(datosAgrupados);

    }catch{
        console.log("Error en el controlador del index")
    }
    
}

export { resultadoFormulario}