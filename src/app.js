import express from 'express';
import multer from 'multer';
import cartsRouter from './routes/cartsRouter.js';
import productsRouter from './routes/productsRouter.js';
import config from './config.js';
import viewsRouter from './routes/viewsRouter.js';
import exphbs from 'express-handlebars';

const app = express();
const upload = multer();

const authenticate = (req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next(); 
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticate); 
//app.engine('handlebars', exphbs());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');
app.use('/static', express.static(`${config.DIRNAME}/src/public`)); 
app.use('/api/carts', cartsRouter); 
app.use('/api/products', productsRouter); 
app.use('/realtimeproducts', viewsRouter);

//multer
app.post('/uploader', upload.single('file'), (req, res) => {
    console.log('Archivo cargado:', req.file);
    res.send('Archivo cargado correctamente');
});

app.get('/products', (req, res) => {
    const products = []; 
    res.render('home', { products });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Error interno del servidor');
});

app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});
