// Paso 1: importar
import express from 'express';
import ProductManager from './ProductManager.js';

/// Paso 2: instanciar el servidor
const app = express();
const PORT = 8080;

// Paso 3: definir los endpoints
// Primer endpoint de Express
const productManager = new ProductManager();

app.get('/products', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts(limit);
    if (products) {
        res.json(products);
    } else {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});