import express from 'express';
import {traerDatosPropietario} from '../models/regPacientes_mostrarDatosTablas.js';

const Router = express.Router();

Router.get('/registrPacientes')