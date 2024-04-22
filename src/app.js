// Paso 1: importar
import express from 'express';
import ProductManager from './ProductManager.js';
import  config  from './config.js';
import userRoutes from './routes/user.routes.js';

/// Paso 2: instanciar el servidor
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use('./static', express.static('${config.DIRNAME}/src/public'));

// Paso 3: definir los endpoints

app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});