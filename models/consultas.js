import conexion from '../config/conexion.js';

const agregarConsultaGeneral = (nombrePropietarioConsulta, nombrePacienteConsulta, motivoConsulta , 
    medicamentosConsulta,  pesoConsultaGeneral, fechaConsulta, idUsuarioActivoPredeterminado = 1, idPropietario, callback) => {
        
        console.log("DATOS QUE MANDAN EN LA CONSULTA: ", );
        
        const query = '';

        conexion.query(query, 
            [], 
            (error, results) => {

            if(error){
                console.log("ERROR EN LINEA 12 DE MASCOTAS.JS", error);
                return callback(error);

            }else{

                return callback(null, results);
            }
        });
    }

export { agregarConsultaGeneral }
