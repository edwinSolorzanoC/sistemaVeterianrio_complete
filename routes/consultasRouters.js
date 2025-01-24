import express from 'express';
const router = express.Router();

import consultasController from "../controllers/consultasController.js";

router.get('/consultas', consultasController.inicioConsultas)

export default router;