const Cart = require('../src/cart');

describe("Integration Tests per Cart", () => {
    let cart;
    beforeEach(() => {
        cart = new Cart();
    });

    test("Rimozione Prodotto non esistente", () => {
        expect(() => cart.removeProduct(999)).toThrow("Product not found in cart");
    });

    test("Rimozione Prodotto fino a quantità zero", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 10, quantity: 3 });
        cart.removeProduct(1);
        cart.removeProduct(1);
        cart.removeProduct(1);
        expect(cart.products[1]).toBeUndefined();
    });

    test("Visualizzazione Carrello con prodotti", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 10, quantity: 2 });
        cart.addProduct({ id: 2, name: "Prodotto B", price: 5, quantity: 1 });
        const view = cart.viewCart();
        expect(view).toEqual(expect.arrayContaining([
            { id: 1, name: "Prodotto A", price: 10, quantity: 2, total: 20 },
            { id: 2, name: "Prodotto B", price: 5, quantity: 1, total: 5 }
        ]));
    });

    test("Visualizzazione Carrello vuoto", () => {
        expect(cart.viewCart()).toEqual([]);
    });

    test("Calcolo Totale - Applicazione sconto sopra 100€", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 50, quantity: 1 });
        cart.addProduct({ id: 2, name: "Prodotto B", price: 60, quantity: 1 });
        expect(cart.calculateTotal()).toBe(99);
    });

    test("Calcolo Totale - Non applicare sconto esattamente a 100€ (caso limite)", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 50, quantity: 1 });
        cart.addProduct({ id: 2, name: "Prodotto B", price: 50, quantity: 1 });
        expect(cart.calculateTotal()).toBe(100);
    });

    test("Svuotamento completo Carrello", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 10, quantity: 2 });
        cart.clearCart();
        expect(cart.viewCart()).toEqual([]);
    });

    test("Flusso Completo - Aggiunta, rimozione e calcolo totale combinato", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 30, quantity: 2 });
        cart.addProduct({ id: 2, name: "Prodotto B", price: 40, quantity: 1 });
        cart.removeProduct(1);
        const total = cart.calculateTotal();
        expect(total).toBe(70);
    });

    test("Flusso Completo - Gestione di operazioni multiple con errori intermedi", () => {
        cart.addProduct({ id: 1, name: "Prodotto A", price: 10, quantity: 1 });
        expect(() => cart.removeProduct(999)).toThrow("Product not found in cart");
        cart.addProduct({ id: 2, name: "Prodotto B", price: 20, quantity: 2 });
        cart.removeProduct(2);
        expect(cart.calculateTotal()).toBe(30);
    });
});
