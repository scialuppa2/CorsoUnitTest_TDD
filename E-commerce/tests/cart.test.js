const Cart = require('../src/cart');
const Product = require('../src/product');

describe("Unit Tests per Cart", () => {
    let cart;
    beforeEach(() => {
        cart = new Cart();
    });

    test("Aggiunta Prodotto", () => {
        const product = new Product({ id: 1, name: "Prodotto A", price: 10, quantity: 2 });
        cart.addProduct(product);
        expect(cart.products[1]).toEqual({
            id: 1,
            name: "Prodotto A",
            price: 10,
            quantity: 2
        });
    });

    test("Incremento quantità", () => {
        const product = new Product({ id: 1, name: "Prodotto A", price: 10, quantity: 2 });
        cart.addProduct(product);
        cart.addProduct({ id: 1, name: "Prodotto A", price: 10, quantity: 3 });
        expect(cart.products[1].quantity).toBe(5);
    });

    test("Aggiunta Prodotto con quantità zero", () => {
        const product = { id: 2, name: "Prodotto B", price: 20, quantity: 0 };
        expect(() => cart.addProduct(product)).toThrow("Cannot add product with quantity zero");
    });

    test("Rimozione Prodotto esistente", () => {
        const product = { id: 1, name: "Prodotto A", price: 10, quantity: 2 };
        cart.addProduct(product);
        cart.removeProduct(1);
        expect(cart.products[1].quantity).toBe(1);
        cart.removeProduct(1);
        expect(cart.products[1]).toBeUndefined();
    });

    test("Svuotamento Carrello già vuoto", () => {
        cart.clearCart();
        expect(Object.keys(cart.products)).toHaveLength(0);
    });

    test("Gestione input non validi", () => {
        expect(() => cart.addProduct({ id: -1, name: "Prodotto C", price: 5, quantity: 1 }))
            .toThrow("Invalid product ID");
        expect(() => cart.removeProduct(-5))
            .toThrow("Invalid product ID");
    });

    test("Gestione aggiunta di prodotto senza ID", () => {
        expect(() => cart.addProduct({ name: "Prodotto D", price: 5, quantity: 1 }))
            .toThrow("Product must have an ID");
    });

    test("Calcolo Totale corretto con più prodotti", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 10, quantity: 2 });
        cart.addProduct({ id: 2, name: "Prodotto B", price: 5, quantity: 3 });
        expect(cart.calculateTotal()).toBe(35);
    });
});
