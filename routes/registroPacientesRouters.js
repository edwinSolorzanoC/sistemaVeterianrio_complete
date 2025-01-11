import express from 'express';
const router = express.Router();

import registroPacientesController from '../controllers/registroPacientesController.js';
router.get('/registroPacientes', registroPacientesController.inicioRegistroPacientes);
router.post('/registrarPropietario', registroPacientesController.registrarPropietarios);
router.post('/registrarMascota', registroPacientesController.registrarMascotas);

export default router;