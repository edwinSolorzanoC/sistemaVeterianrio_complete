import express from 'express';
import path from 'path';
import session from 'express-session';


const app = express();

// Configuración de express-session
app.use(session({
    secret: 'SKNnNNki',  // Cambia esto por una clave secreta
    resave: false,               // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: true,     // Guardar una sesión nueva si no tiene valores
    cookie: { secure: false }    // Si usas HTTPS, cambia 'false' por 'true'
}));

app.use(express.urlencoded({ extended: true })); //esto es para que el servidor entienda los formatos de los formularios
app.use(express.json());//esto es para que el servidor entienda los formatos json


// configuracion del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//esto es para que el servidor pueda servir archivos estaticos
app.use(express.static(path.join(process.cwd(), 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));


// estas son las rutas de la aplicacion para ejecutar las paginas 
// app.get('/', (req, res) => { res.render('index'); });

app.get('/', indexRouters)


import indexRouters from './routes/indexRouters.js';

app.post('/login', indexRouters);
app.post('/crearCuenta', indexRouters);
app.post('/updatepass', indexRouters);


import administracionRouters from './routes/administracionRouters.js';
app.get('/administracion', administracionRouters);
app.post('/consultageneral', administracionRouters);
app.post('/consultavacunacion', administracionRouters);
app.get('/logout', administracionRouters);

import registroPacientesRouters from './routes/registroPacientesRouters.js';
app.get('/registroPacientes', registroPacientesRouters);
app.post('/registrarPropietario', registroPacientesRouters);
app.post('/registrarMascota', registroPacientesRouters);

import perfilPacientesRouters from './routes/perfilPacientesRouters.js';
app.get('/perfilPacientes', perfilPacientesRouters);
app.post('/enviodedatos', perfilPacientesRouters);

import consultasRoutersa from './routes/consultasRouters.js'
app.get('/consultas', consultasRoutersa)
