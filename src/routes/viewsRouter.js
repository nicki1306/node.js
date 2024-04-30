import express from 'express';
import ProductManager from '../dataManager/ProductManager.js';

const router = express.Router();

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductManager.getInstance().getProducts();
        res.render('realTimeProducts', { title: 'REAL TIME PRODUCTS', products: products });
    } catch (error) {
        console.error('Error al obtener los productos en tiempo real', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/realtimeproducts', async (req, res) => {
    try {
        // Validar los campos
        const { title, description, price, thumbnail, code, stock } = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Agregar el nuevo producto
        const newProduct = await ProductManager.getInstance().addProduct(req.body);

        // Actualizar la lista de productos en tiempo real
        const updatedProducts = await ProductManager.getInstance().getProducts();

        // Emitir evento de nuevo producto a través de WebSocket
        io.emit('new-product', updatedProducts);

        res.status(200).json({ status: 'success', message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error al agregar un nuevo producto', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;