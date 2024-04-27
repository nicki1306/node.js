import express from 'express';
import cartsRouter from './routes/cartsRouter.js';
import productsRouter from './routes/productsRouter.js';
import config from './config.js';
import { CartManager } from './dataManager/CartManager.js';

const app = express();

const autenticate = (req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next(); 
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(autenticate); 
app.use('/static', express.static(`${config.DIRNAME}/src/public`)); 
app.use('/api/carts', cartsRouter); 
app.use('/api/products', productsRouter); 

app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
}); 