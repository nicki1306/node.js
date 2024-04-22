import { Router } from 'express';

const router = Router();

//const productManager = new ProductManager('./productos.json');

app.get('/product', (req, res) => {
    //res.status(200).send({ origin: 'server1', payload: 'productos.json' });
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts(limit);
    console.log(products)
    if (products) {
        res.json(products);
    } else {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/product/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

app.post('/product', (req, res) => {
    const product = req.body;
    const createdProduct = productManager.addProduct(product);
    res.json(createdProduct);
});

app.put('/product/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    const updatedProduct = productManager.updateProduct(productId, updatedFields);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

app.delete('/product/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const deletedProduct = productManager.deleteProduct(productId);
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});


export default router