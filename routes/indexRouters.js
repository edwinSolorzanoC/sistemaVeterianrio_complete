import express from 'express';
const router = express.Router();


import indexController from '../controllers/indexController.js';

router.get('/', indexController.inciarPage)
router.post('/login', indexController.iniciarSesion);
router.post('/crearCuenta', indexController.crearUsuario);
router.post('/updatepass', indexController.reestablecerContrasenna);

export default router;