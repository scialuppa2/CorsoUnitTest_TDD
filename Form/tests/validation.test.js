const { validateName, validateEmail, validateParticipants } = require('../src/validation');

describe('Validazione del Form - Test Unitari', () => {
    // TEST PER LA VALIDAZIONE DEL NOME
    describe('validateName', () => {
        test('accetta nomi validi', () => {
            expect(validateName("Fabrizio")).toBe(null);
            expect(validateName("Valeria")).toBe(null);
        });

        test('ritorna un errore per nomi troppo corti', () => {
            expect(validateName("Sa")).toBe("Il nome deve essere lungo almeno 3 caratteri.");
            expect(validateName("")).toBe("Il nome deve essere lungo almeno 3 caratteri.");
        });
    });

    // TEST PER LA VALIDAZIONE DELL'EMAIL
    describe('validateEmail', () => {
        test('accetta email valide', () => {
            expect(validateEmail("username@example.com")).toBe(null);
            expect(validateEmail("username@gmail.it")).toBe(null);
        });

        test('ritorna un errore per email non valide', () => {
            expect(validateEmail("usernamexample.com")).toBe("L'email deve essere valida e contenere un '@' e un dominio.");
            expect(validateEmail("")).toBe("L'email deve essere valida e contenere un '@' e un dominio.");
        });
    });

    // TEST PER LA VALIDAZIONE DEL NUMERO DEI PARTECIPANTI
    describe('validateParticipants', () => {
        test('accetta numeri validi tra 1 e 10', () => {
            expect(validateParticipants(1)).toBe(null);
            expect(validateParticipants(5)).toBe(null);
            expect(validateParticipants(10)).toBe(null);
        });

        test('ritorna un errore se il numero non è tra 1 e 10', () => {
            expect(validateParticipants(0)).toBe("Il numero di partecipanti deve essere un intero compreso tra 1 e 10.");
            expect(validateParticipants(-3)).toBe("Il numero di partecipanti deve essere un intero compreso tra 1 e 10.");
            expect(validateParticipants(11)).toBe("Il numero di partecipanti deve essere un intero compreso tra 1 e 10.");
        });

        test('ritorna un errore se il valore non è un numero intero', () => {
            expect(validateParticipants("cinque")).toBe("Il numero di partecipanti deve essere un intero compreso tra 1 e 10.");
            expect(validateParticipants(3.5)).toBe("Il numero di partecipanti deve essere un intero compreso tra 1 e 10.");
        });
    });
});
