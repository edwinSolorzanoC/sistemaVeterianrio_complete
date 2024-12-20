import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';


const app = express();

app.use(express.urlencoded({ extended: true })); //esto es para que el servidor entienda los formatos de los formularios
app.use(express.json());//esto es para que el servidor entienda los formatos json




//esto es para que se escuche el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// configuracion del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//esto es para que el servidor pueda servir archivos estaticos
app.use(express.static(path.join(process.cwd(), 'public')));


import loginRouterUsuarios from './routes/loginRouterUsuarios.js';
app.post('/login',loginRouterUsuarios);
