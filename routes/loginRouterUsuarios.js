import { verificarUsuario } from '../models/usuarios.js';
import express from 'express';
import path from 'path';

const Router = express.Router();

Router.post('/login', (req, res) => {
    const { usuario, contrasenna } = req.body;

    verificarUsuario(usuario, contrasenna, (error, results) => {
        if (error) {
            console.log("ERROR EN LINEA 37 DE INDEX.JS", error);
            return res.status(500).send('Error en la base de datos');
        }
        if (results.length > 0) {
            return res.sendFile(path.join(process.cwd(), 'public', 'administracion.html'));
        }
        
        return res.send('USUARIO NO AUTENTICADO LINEA 43 DE INDEX.JS');
    });

});

export default Router;