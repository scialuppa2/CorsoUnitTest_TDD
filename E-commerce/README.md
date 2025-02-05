# E-commerce - Carrello della Spesa

Questa applicazione è un semplice e-commerce che gestisce un carrello della spesa. L'implementazione utilizza il Test-Driven Development (TDD) e include test unitari e di integrazione per garantire il corretto funzionamento delle funzionalità.

## Struttura del Progetto

/src    
├─ cart.js - Contiene la logica per la gestione del carrello 
└─ product.js - Definisce la classe Product per la gestione dei prodotti 
/tests 
├─ cart.test.js - Test unitari per la classe Cart 
└─ integration.test.js - Test di integrazione per la classe Cart 


## Prodotto

La classe `Product` serve per creare istanze di prodotto con le seguenti proprietà e controlli:

### Costruttore `new Product({ id, name, price, quantity })`

- **Parametri:**  
  - `id` (number): Identificativo univoco del prodotto. Deve essere definito e non negativo.
  - `name` (string): Nome del prodotto.
  - `price` (number): Prezzo unitario del prodotto.
  - `quantity` (number, opzionale): Quantità iniziale del prodotto. Il valore predefinito è 1 e deve essere maggiore di zero.
- **Errori:**  
  - Lancia un errore se l’`id` non viene fornito o è negativo.
  - Lancia un errore se la `quantity` è zero o negativa.



## Carrello

La classe `Cart` fornisce i seguenti metodi:

### addProduct(product)
- **Descrizione:**  
  Aggiunge un prodotto al carrello. Se il prodotto esiste già (identificato tramite `id`), ne incrementa la quantità.  
- **Parametri:**  
    - `product` (oggetto): Oggetto contenente le proprietà:
        - `id` (number): Identificativo univoco del prodotto.
        - `name` (string): Nome del prodotto.
        - `price` (number): Prezzo unitario del prodotto.
        - `quantity` (number): Quantità da aggiungere (valore predefinito: 1).
- **Errori:**  
    - Lancia un errore se il prodotto non ha un `id` o se l’`id` è negativo.
    - Lancia un errore se `quantity` è zero o negativa.

### removeProduct(productId)
- **Descrizione:**  
  Rimuove un prodotto dal carrello. Se il prodotto ha una quantità maggiore di 1, la quantità viene decrementata di 1. Se la quantità è 1, il prodotto viene completamente rimosso dal carrello.
- **Parametri:**  
  - `productId` (number): Identificativo del prodotto da rimuovere.
- **Errori:**  
  - Lancia un errore se il `productId` non è valido.
  - Lancia un errore se il prodotto non è presente nel carrello.

### viewCart()
- **Descrizione:**  
  Restituisce una lista (array) di tutti i prodotti presenti nel carrello.  
- **Output:**  
  Un array di oggetti, ognuno dei quali contiene:
    - `id`: Identificativo del prodotto.
    - `name`: Nome del prodotto.
    - `price`: Prezzo unitario.
    - `quantity`: Quantità presente nel carrello.
    - `total`: Totale calcolato come `price * quantity`.

### calculateTotal()
- **Descrizione:**  
  Calcola il totale del carrello sommando il prodotto di `price` e `quantity` per ciascun prodotto. Se il totale supera 100€, viene applicato uno sconto del 10%.  
- **Output:**  
  - Ritorna il totale come numero (con due cifre decimali).
- **Esempio:**  
  - Se il totale è 110€, il totale finale sarà 99€ (110 * 0.9).

### clearCart()
- **Descrizione:**  
  Svuota il carrello, rimuovendo tutti i prodotti.
- **Output:**  
  - Dopo l’esecuzione, il carrello risulta vuoto.

