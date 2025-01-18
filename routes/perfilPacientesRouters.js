import express from "express"

const router = express.Router();

import perfilPacientesController from "../controllers/perfilPacientesController.js";
router.get('/perfilPacientes', perfilPacientesController.inicioPerfilPacientes);
router.post('/enviodedatos', perfilPacientesController.mostrarDatosSeleccionados);

export default router;