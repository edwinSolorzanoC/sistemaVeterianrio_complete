import { verificarUsuario } from '../models/usuarios.js';
import express from 'express';

const Router = express.Router();

Router.post('/login', (req, res) => {
    const { usuario, contrasenna } = req.body;

    verificarUsuario(usuario, contrasenna, (error, results) => {
        if (error) {
            console.log("ERROR EN LINEA 13 ROUTER LOGIN", error);
            return res.redirect('/');
        }
        if (results.length > 0) {
            return res.redirect('/ingresoexitoso');
        }else{
            console.log("Usuario o contraseña incorrectos");
            return res.redirect('/');
        }
    });

});

export default Router;