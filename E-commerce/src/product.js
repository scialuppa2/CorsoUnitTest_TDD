class Product {
    constructor({ id, name, price, quantity = 1 }) {
        if (id == null) {
            throw new Error("Product must have an ID");
        }
        if (typeof id !== "number" || id < 0) {
            throw new Error("Invalid product ID");
        }
        if (quantity < 0) {
            throw new Error("Invalid product quantity");
        }
        if (quantity === 0) {
            throw new Error("Cannot create product with quantity zero");
        }
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

module.exports = Product;
