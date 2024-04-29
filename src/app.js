import express from 'express';
import multer from 'multer';
import cartsRouter from './routes/cartsRouter.js';
import productsRouter from './routes/productsRouter.js';
import config from './config.js';
import uploader from './uploader.js';
import CartManager from './dataManager/CartManager.js';
import handlebars from 'express-handlebars';
import viewsRouter from './views/viewsRoutes.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const upload = multer();
const server = http.createServer(app);
const io = new Server(server);

const autenticate = (req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next(); 
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(autenticate); 
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');
app.use('/static', express.static(`${config.DIRNAME}/src/public`)); 
app.use('/api/carts', cartsRouter); 
app.use('/api/products', productsRouter); 
app.use('/', viewsRouter);

// Utiliza multer en tu ruta para manejar la carga de archivos
app.post('/uploader', upload.single('file'), (req, res) => {
    // Accede al archivo cargado a través de req.file
    console.log('Archivo cargado:', req.file);
    res.send('Archivo cargado correctamente');
});

// Ruta para obtener la lista de productos y renderizar la vista "home"
app.get('/products', (req, res) => {
    // Aquí obtendrías la lista de productos desde tu base de datos u otra fuente
    const products = []; // Por ahora, una lista de productos vacía
    res.render('home', { products });
});

// Configurar WebSocket
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    // Aquí puedes manejar los eventos de WebSocket, como enviar datos a los clientes
});

app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});
