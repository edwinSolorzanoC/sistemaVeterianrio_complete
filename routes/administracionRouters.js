import express from 'express';
const router = express.Router();

import administracionController from '../controllers/administracionController.js';

router.get('/administracion', administracionController.inicioAdministracion);
router.post('/consultageneral', administracionController.insertarConsultaGeneralSinPaciente);
router.post('/consultavacunacion', administracionController.insertaVacunacionSinPacinte)

export default router;