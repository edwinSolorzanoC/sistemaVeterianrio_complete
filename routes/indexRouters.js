import express from 'express';
const router = express.Router();

import indexController from '../controllers/indexController.js';

router.post('/login', indexController.iniciarSesion);
router.post('/crearCuenta', indexController.crearUsuario);

export default router;