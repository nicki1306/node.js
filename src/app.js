// Paso 1: importar
import express from 'express';
import ProductManager from '../src/desafio.js';

/// Paso 2: instanciar el servidor
const app = express();
const PORT = 8080;

const productManager = new ProductManager('productos.json');
await productManager.addProduct({title: 'Product 1',});
console.log(await productManager .getProducts(0));


// Paso 3: definir los endpoints
// Primer endpoint de Express
app.get('/products', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    productManager.getProducts(limit)
        .then(products => {
            res.json(products);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error al obtener los productos.' });
        });
});

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    productManager.getProductById(productId)
        .then(product => {
            res.json(product);
        })
        .catch(error => {
            res.status(404).json({ error: 'Producto no encontrado.' });
        });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${8080}`);
});