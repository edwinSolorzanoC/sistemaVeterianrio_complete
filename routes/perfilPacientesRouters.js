import express from "express"

const router = express.Router();

import perfilPacientesController from "../controllers/perfilPacientesController.js";
router.get('/perfilPacientes', perfilPacientesController.inicioPerfilPacientes);

export default router;