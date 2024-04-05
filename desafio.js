const fs = require('fs');
const path = require('path');

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = this.generateId();
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    generateId() {
        return '_' + Math.random().toString(36).substring(2, 9);
    }
}
console.log(Product)

class ProductManager {
    constructor(FilePath) {
        this.path = FilePath;

    }

    addProduct(product) {
        // Cargar productos existentes desde el archivo
        const products = this.getProducts();
        // Asignar un ID autoincrementable al nuevo producto
        const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: nextId, ...product };
        // Agregar el nuevo producto al arreglo de productos
        products.push(newProduct);
        // Guardar los productos actualizados en el archivo
        this.saveProducts(products);
        return newProduct; // Devolver el producto agregado con su ID asignado
    }

    getProducts() {
        let data;
        try {
            data = fs.readFileSync(this.path, 'utf8');
        } catch (error) {
            return [];
        }
        return JSON.parse(data);
    }

    getProductById(productId) {
        // Obtener todos los productos
        const products = this.getProducts();
        // Buscar el producto con el ID especificado
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        return product;
    }
    updateProduct(productId, updatedFields) {
        // Obtener todos los productos
        let products = this.getProducts();
        // Buscar el índice del producto con el ID especificado
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error('Producto no encontrado.');
        }
        // Actualizar el producto con los campos proporcionados
        products[index] = { ...products[index], ...updatedFields };
        // Guardar los productos actualizados en el archivo
        this.saveProducts(products);
    }

    deleteProduct(productId) {
        // Obtener todos los productos
        let products = this.getProducts();
        // Filtrar el producto con el ID especificado
        products = products.filter(p => p.id !== productId);
        // Guardar los productos actualizados en el archivo
        this.saveProducts(products);
    }

    saveProducts(products) {
        const data = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, data, (err) => {
            if (err) {
                console.error('Error al guardar productos:', err);
                throw new Error('Error al guardar productos en el archivo.');
            }
        });
    }
}

const productManager = new ProductManager('productos.json');

// Agregar un producto
const newProduct = {
    title: 'Producto Nuevo',
    description: 'Descripción del producto nuevo',
    price: 100,
    thumbnail: 'imagen.jpg',
    code: 'ABC123',
    stock: 50
};
const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

// Consultar un producto por su ID
const productId = addedProduct.id;
const product = productManager.getProductById(productId);
console.log('Producto encontrado por ID:', product);

// Modificar un producto
const updatedFields = {
    title: 'Producto Modificado',
    description: 'Descripción del producto modificado',
    price: 150,
    thumbnail: 'imagen_modificada.jpg',
    stock: 30
};
productManager.updateProduct(productId, updatedFields);
console.log('Producto modificado:', productManager.getProductById(productId));

// Eliminar un producto
productManager.deleteProduct(productId);
console.log('Producto eliminado. Productos restantes:', productManager.getProducts());