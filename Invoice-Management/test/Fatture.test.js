const { Fattura, fattureInMemoria, aggiungiFattura, modificaFattura, eliminaFattura, recuperaFatture } = require('../src/Fatture');

describe('Sistema di Gestione Fatture', () => {
    beforeEach(() => {
        while (fattureInMemoria.length) fattureInMemoria.pop();
    });

    describe('Validazione dei Dati', () => {

        test('Campi obbligatori non possono essere vuoti', () => {
            const fatturaVuota = new Fattura(null, '', 0, '');
            expect(() => aggiungiFattura(fatturaVuota)).toThrow('Dati fattura non validi');
        });
    
        test('Formato data deve essere valido', () => {
            const fattura = new Fattura(1, 'Cliente A', 100, 'data-non-valida');
            expect(() => aggiungiFattura(fattura)).toThrow('Formato data non valido');
        });
        
        test('Importo deve essere un numero positivo', () => {
            const fattura = new Fattura(1, 'Cliente A', -100, '2025-01-01');
            expect(() => aggiungiFattura(fattura)).toThrow('Importo non valido');
        });

    });
    
    

    describe('Funzionalità CRUD', () => {

        test('Aggiunta di una fattura', () => {
            const fattura = new Fattura(1, 'Cliente A', 100, '2025-01-01');
            const aggiunta = aggiungiFattura(fattura);
            expect(aggiunta).toBe(fattura);
            expect(recuperaFatture()).toContain(fattura);
        });
    
        test('Modifica di una fattura', () => {
            const fattura = new Fattura(1, 'Cliente A', 100, '2025-01-01');
            aggiungiFattura(fattura);
            const modificata = modificaFattura(1, { importo: 150 });
            expect(modificata.importo).toBe(150);
            expect(recuperaFatture()[0].importo).toBe(150);
        });
    
        test('Eliminazione di una fattura', () => {
            const fattura = new Fattura(1, 'Cliente A', 100, '2025-01-01');
            aggiungiFattura(fattura);
            const eliminata = eliminaFattura(1);
            expect(eliminata).toBe(true);
            expect(recuperaFatture()).not.toContain(fattura);
        });

        test('Recupero e visualizzazione di fatture', () => {
            const fattura1 = new Fattura(1, 'Cliente A', 100, '2025-01-01');
            const fattura2 = new Fattura(2, 'Cliente B', 200, '2025-01-02');
            aggiungiFattura(fattura1);
            aggiungiFattura(fattura2);
            const fatture = recuperaFatture();
            expect(fatture).toHaveLength(2);
            expect(fatture).toEqual([fattura1, fattura2]);
        });

    });

    describe('Gestione Errori', () => {

        test('Gestione di dati non validi durante il salvataggio', () => {
            const fattura = new Fattura(null, '', 0, 'data-non-valida');
            expect(() => aggiungiFattura(fattura)).toThrow('Dati fattura non validi');
        });
    
        test('Messaggi di errore per input non validi', () => {
            const fattura = new Fattura(1, 'Cliente A', -50, 'data-non-valida');
            expect(() => aggiungiFattura(fattura)).toThrow('Importo non valid');
        });
        
    })
    
    
    
});
