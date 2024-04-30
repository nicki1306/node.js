import fs from 'fs/promises';
import path from 'path';
import ProductManager from './ProductManager.js';
//import config from './config.js';

export class CartManager {
    static #instance;
    #cart;
    #filePath;

    constructor() {
        this.#cart = [];
        this.#filePath = path.join(config.DIRNAME, './carts.json');
    }

    static getInstance() {
        if (!CartManager.#instance) {
            CartManager.#instance = new CartManager();
        }
        return CartManager.#instance;
    }

    // Carga los carritos desde el archivo JSON
    async loadCarts() {
        try {
            const data = await fs.readFile(this.#filePath, 'utf-8');
            this.#cart = JSON.parse(data);
        } catch (error) {
            console.error(`Error loading carts: ${error}`);
            this.#cart = [];
        }
    }

    // Guarda los carritos en el archivo JSON
    async saveCarts() {
        try {
            await fs.writeFile(this.#filePath, JSON.stringify(this.#cart, null, 2));
        } catch (error) {
            console.error(`Error saving carts: ${error}`);
            throw new Error(`Unable to save carts: ${error}`);
        }
    }

    // Crea un nuevo carrito
    async createCart() {
        await this.loadCarts();
        const newCart = {
            id: this.#cart.length !== 0 ? this.#cart[this.#cart.length - 1].id + 1 : 1,
            products: []
        };
        this.#cart.push(newCart);
        await this.saveCarts();
        return newCart;
    }

    async getCartById(id) {
        await this.loadCarts();
        const cart = this.#cart.find(cart => cart.id === id);
        if (!cart) {
            throw new Error(`Cart with ID ${id} not found`);
        }
        return cart;
    }

    // Agrega un producto a un carrito
    async addProdToCart(cartId, productId) {
        await this.loadCarts();
        const cart = this.#cart.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error(`Cart with ID ${cartId} not found`);
        }
        await ProductManager.getInstance().getProductById(productId);
        const productIndex = cart.products.findIndex(product => product.productId === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }
        await this.saveCarts();
        return cart;
    }

    // Elimina un producto de un carrito
    async deleteProdFromCart(cartId, productId) {
        await this.loadCarts();
        const cart = this.#cart.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error(`Cart with ID ${cartId} not found`);
        }
        const productIndex = cart.products.findIndex(product => product.productId === productId);
        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity--;
            } else {
                cart.products.splice(productIndex, 1);
            }
            await this.saveCarts();
        } else {
            throw new Error(`Product with ID ${productId} not found in cart ${cartId}`);
        }
        return cart;
    }
}
