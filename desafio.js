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
    constructor() {
        this.products = [];

    }

    addProduct(product) {
        const isDuplicate = this.products.some(existingProduct => existingProduct.code === product.code);
        if (isDuplicate) {
            throw new Error('El código del producto ya existe.');
        }
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        return product;
    }
}

const productManager = new ProductManager();
productManager.getProducts()

const getProductById = (productId) => {
    const product = productManager.getProductById(productId);
    return product;
}

getProductById(1)
