import fs from 'fs';

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

class ProductManager {
    constructor(FilePath) {
        this.path = FilePath;
    }

    addProduct(product) {
        const products = this.getProducts();
        const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: nextId, ...product };
        products.push(newProduct);
        this.saveProducts(products);
        return newProduct;
    }

    getProducts(limit) {
        let data;
        try {
            data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(
                limit ? data.slice(0, limit) : data
            );
        } catch (error) {
            return [];
        }
    }


    getProductById(productId) {
        const products = this.getProducts();
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        return product;
    }

    updateProduct(productId, updatedFields) {
        let products = this.getProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error('Producto no encontrado.');
        }
        products[index] = { ...products[index], ...updatedFields };
        this.saveProducts(products);
    }

    deleteProduct(productId) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== productId);
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

const productManager = new ProductManager('./products.json');

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

const productId = addedProduct.id;
const product = productManager.getProductById(productId);
console.log('Producto encontrado por ID:', product);

const updatedFields = {
    title: 'Producto Modificado',
    description: 'Descripción del producto modificado',
    price: 150,
    thumbnail: 'imagen_modificada.jpg',
    stock: 30
};

productManager.updateProduct(productId, updatedFields);
console.log('Producto modificado:', productManager.getProductById(productId));

productManager.deleteProduct(productId);
console.log('Producto eliminado. Productos restantes:', productManager.getProducts());

export default ProductManager;



