import express from 'express';
import fs from 'fs-extra';
import path from'path';
import config from '../config.js';
import ProductManager  from '../dataManager/ProductManager.js';


// Definir el archivo JSON para productos y carritos

const productsFile = path.join(config.DIRNAME, './products.json');
const cartsFile = path.join(config.DIRNAME, './carts.json');

// Leer productos del archivo JSON
const getProducts = async () => {
    const fileContent = await fs.readFile(productsFile, 'utf8');
    return JSON.parse(fileContent) || [];
};

// Leer carritos del archivo JSON
const getCarts = async () => {
    const fileContent = await fs.readFile(cartsFile, 'utf8');
    return JSON.parse(fileContent) || [];
};

// Escribir productos en el archivo JSON
const saveProducts = async (products) => {
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
};

// Escribir carritos en el archivo JSON
const saveCarts = async (carts) => {
    await fs.writeFile(cartsFile, JSON.stringify(carts, null, 2));
};

// Rutas para los productos
const Router = express.Router();

Router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const products = await getProducts();
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
});

Router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await getProducts();
    const product = products.find((product) => product.id === pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado.' });
    }
});

Router.post('/', async (req, res) => {
    const products = await getProducts();
    const newProduct = {
        id: Math.max(...products.map((product) => product.id)) + 1,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        stock: req.body.stock || 0,
        category: req.body.category,
        thumbnails: req.body.thumbnails || [],
        status: req.body.status === false ? false : true, 
    };
    products.push(newProduct);
    await saveProducts(products);
    res.json(newProduct);
});

Router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await getProducts();
    const productIndex = products.findIndex((product) => product.id === pid);
    if (productIndex !== -1) {
        const updatedProduct = {
            ...products[productIndex],
            ...req.body,
        };
        products[productIndex] = updatedProduct;
        await saveProducts(products);
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado.' });
    }
});

Router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await getProducts();
    const productIndex = products.findIndex((product) => product.id === pid);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        await saveProducts(products);
        res.json({ message: 'Producto eliminado.' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado.' });
    }
});

// Rutas para los carritos

Router.post('/', async (req, res) => {
    const carts = await getCarts();
    const newCart = {
        id: Math.max(...carts.map((cart) => cart.id)) + 1,
        products: [],
    };
    carts.push(newCart);
    await saveCarts(carts);
    res.json(newCart);
});


export default Router ;
