import express from 'express';
const router = express.Router();

import administracionController from '../controllers/administracionController.js';

router.get('/administracion', administracionController.inicioAdministracion);
router.post('/consultageneral', administracionController.insertarConsultaGeneral);
router.post('/consultavacunacion', administracionController.insertaVacunacion);

export default router;