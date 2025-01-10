import express from 'express';
const router = express.Router();

import registroPacientesController from '../controllers/registroPacientesController.js';
router.get('/registroPacientes', registroPacientesController.inicioRegistroPacientes);

export default router;