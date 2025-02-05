class Cart {
    constructor() {
        this.products = {};
    }

    addProduct(product) {
        if (!product || product.id == null) {
            throw new Error("Product must have an ID");
        }
        if (typeof product.id !== "number" || product.id < 0) {
            throw new Error("Invalid product ID");
        }
        if (product.quantity == null) {
            product.quantity = 1;
        }
        if (product.quantity < 0) {
            throw new Error("Invalid product quantity");
        }
        if (product.quantity === 0) {
            throw new Error("Cannot add product with quantity zero");
        }

        if (this.products[product.id]) {
            this.products[product.id].quantity += product.quantity;
        } else {
            this.products[product.id] = { ...product };
        }
    }

    removeProduct(productId) {
        if (productId == null || typeof productId !== "number" || productId < 0) {
            throw new Error("Invalid product ID");
        }
        if (!this.products[productId]) {
            throw new Error("Product not found in cart");
        }
        if (this.products[productId].quantity > 1) {
            this.products[productId].quantity -= 1;
        } else {
            delete this.products[productId];
        }
    }

    viewCart() {
        return Object.values(this.products).map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            total: p.price * p.quantity,
        }));
    }

    calculateTotal() {
        let total = Object.values(this.products).reduce(
            (acc, p) => acc + p.price * p.quantity,
            0
        );

        if (total > 100) {
            total = total * 0.9;
        }
        return parseFloat(total.toFixed(2));
    }

    clearCart() {
        this.products = {};
    }
}

module.exports = Cart;
