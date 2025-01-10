import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';


const app = express();

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
app.get('/', (req, res) => { //mostrar el index
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});



import indexRouters from './routes/indexRouters.js';
app.post('/login', indexRouters);
