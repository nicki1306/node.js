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

console.log('Productos después de la creación:', productManager.getProducts())

productManager.addProduct(new Product("titulo", "Descripción", 20, "imagen1.jpg", "ABC123", 10));
productManager.addProduct(new Product("titulo", "Descripción", 30, "imagen2.jpg", "DEF456", 15));

console.log('Todos los productos:', productManager.getProducts())

const newProduct = new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
const isDuplicate = productManager.products.some(product => product.code === newProduct.code);
if (isDuplicate) {
    console.error('Error: El código del producto ya existe.');
} else {
    productManager.addProduct(newProduct);
}

const productId = productManager.getProducts()[0].id;
const product = productManager.products.find(product => product.id === productId);
if (product) {
    console.log('Producto obtenido por ID:', product);
} else {
    console.error('Error: Producto no encontrado.');
}