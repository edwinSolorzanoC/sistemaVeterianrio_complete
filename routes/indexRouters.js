import express from 'express';
import indexController from '../controllers/indexController.js'
const router = express.Router();

router.post('/login', indexController.verificarCrendenciales);

export default router;