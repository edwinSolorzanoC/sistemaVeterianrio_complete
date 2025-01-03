// import { verificarUsuario } from '../models/usuarios.js';
import express from 'express';
import indexController from '../controllers/indexController.js'
const router = express.Router();

router.post('/login', indexController.ingresarSitema);


/*
Router.post('/login', (req, res) => {
    const { usuario, contrasenna } = req.body;

    verificarUsuario(usuario, contrasenna, (error, results) => {
        if (error) {
            console.log("ERROR EN LINEA 11 ROUTER LOGIN", error);
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

export default Router;*/
