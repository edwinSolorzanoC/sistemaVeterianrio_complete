import express from 'express';
import path from 'path';
// import connection from './config/db';

const app = express();

//esto es para que se escuche el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//esto es para que el servidor pueda servir archivos estaticos
app.use(express.static(path.join(process.cwd(), 'public')));

