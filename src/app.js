// Paso 1: importar
import express from 'express';
import routes from './routes/users.js';
import  config   from './config.js';
import { uploader } from './uploader.js';
import userRouter from './routes/users.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/carts.js';

const userRoutes = routes;
const productRoutes = productRouter;
const cartRoutes = cartRouter;

/// Paso 2: instanciar el servidor
const app = express();
const PORT = 8080;

// Crear rutas

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(uploader.single('image'));
app.use('/static', express.static(`${config.DIRNAME}/src/public`)); 
//app.use('./routes/products', productRoutes); SI DESCOMENTO ESTAS DOS LINEAS ME TIRA UN ERROR RELACIONADO AL MIDLEWARE
//app.use('./routes/carts', cartRoutes);

// Paso 3: definir los endpoints

// Paso 4: poner a escuchar al servidor

app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
