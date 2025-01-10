import express from 'express';
const router = express.Router();

import consultaDatosUsuario from '../controllers/administracionController.js';

router.get('/administracion', consultaDatosUsuario.obtenerDatos);

export default router;