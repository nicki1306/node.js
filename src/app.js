import express from 'express';
import multer from 'multer';
import cartsRouter from './routes/cartsRouter.js';
import productsRouter from './routes/productsRouter.js';
import config from './config.js';
import uploader from './uploader.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/viewsRouter.js';
import http from 'http';


const app = express();
const upload = multer();

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

//multer
app.post('/uploader', upload.single('file'), (req, res) => {
    console.log('Archivo cargado:', req.file);
    res.send('Archivo cargado correctamente');
});

// Ruta para obtener la lista de productos
app.get('/products', (req, res) => {
    const products = []; 
    res.render('home', { products });
});


app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});
