import express from 'express';
const router = express.Router();

import usuarioController from '../controllers/indexController.js';

router.post('/login', usuarioController.iniciarSesion);

export default router;