import { insertarMascota } from "../models/mascotas.js";
import { insertarPropietario } from "../models/propietarios.js";
import express from 'express';

const Router = express.Router();

Router.post('/registrarPropietario', (req, res) => {
    const { cedulaPropietario, nombrePropietario, direccionPropietario, telefonoPropietario, correoPropietario } = req.body;
    const idUsuarioActivoPredeterminado = 1;

    insertarPropietario(cedulaPropietario, nombrePropietario, direccionPropietario, telefonoPropietario, correoPropietario, idUsuarioActivoPredeterminado, (error, results) => {
        if (error) {
            console.log("ERROR EN LINEA 11 ROUTER REGISTRAR PROPIETARIO", error);
            return res.redirect('/');
        }
        if (results.affectedRows > 0) {
            console.log("Propietario registrado exitosamente")
            return res.redirect('/administracion');
        }else{
            console.log("No se pudo registrar el propietario");
            return res.redirect('/administracion');
        }
    });
});

Router.post('/registrarMascota', (req, res) => {

    const { nombreMascota, tipoMascota, pesoMascota, edadMascota, razaMascota, castracionMascota, fechaNacimientoMascota, colorMascota, partosMascota, fechaPartosMascota } = req.body;
    const idUsuarioActivoPredeterminado = 1;

    insertarMascota(nombreMascota, tipoMascota, pesoMascota, edadMascota, razaMascota, castracionMascota, fechaNacimientoMascota, colorMascota, partosMascota, fechaPartosMascota, idUsuarioActivoPredeterminado, (error, results) => {
        if (error) {
            console.log("ERROR EN LINEA 11 ROUTER REGISTRAR MASCOTA", error);
            return res.redirect('/');
        }
        if (results.affectedRows > 0) {
            console.log("Mascota registrada exitosamente")
            return res.redirect('/administracion');
        }else{
            console.log("No se pudo registrar la mascota");
            return res.redirect('/administracion');
        }
    });

});

export default Router;