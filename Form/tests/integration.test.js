import { handleFormSubmit, sendRegistration } from '../src/form.js'


global.fetch = jest.fn();

describe('handleFormSubmit', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Invio del form valido - dati inviati correttamente al server', async () => {
        const fakeResponse = { message: "Registrazione avvenuta con successo" };
        fetch.mockResolvedValue({
            ok: true,
            json: async () => fakeResponse
        });

        const formData = { name: "Fabrizio", email: "fabrizio@example.com", participants: 3 };

        const result = await handleFormSubmit(formData);
        expect(result.success).toBe(true);
        expect(result.result).toEqual(fakeResponse);

        expect(fetch).toHaveBeenCalledWith("https://formspree.io/f/manqbqln", expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }));
    });

    test('Invio del form con errori di validazione - non viene inviato il form', async () => {
        const formData = { name: "Sa", email: "usernamexample.com", participants: 15 };

        const result = await handleFormSubmit(formData);
        expect(result.success).toBe(false);
        expect(result.errors).toEqual({
            name: "Il nome deve essere lungo almeno 3 caratteri.",
            email: "L'email deve essere valida e contenere un '@' e un dominio.",
            participants: "Il numero di partecipanti deve essere un intero compreso tra 1 e 10."
        });

        expect(fetch).not.toHaveBeenCalled();
    });

    test('Gestione di errori dal server - il form gestisce correttamente gli errori', async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: async () => ({ error: "Errore generico dal server" })
        });

        const formData = { name: "Valeria", email: "valeria@example.com", participants: 2 };

        const result = await handleFormSubmit(formData);
        expect(result.success).toBe(false);
        expect(result.errors.server).toBe("Errore generico dal server");
    });

    test('Gestione di errori sconosciuti dal server', async () => {
        fetch.mockResolvedValue({ ok: false, json: async () => { throw new Error("Errore JSON") } });

        const formData = { name: "Valeria", email: "valeria@example.com", participants: 2 };

        const result = await handleFormSubmit(formData);
        expect(result.success).toBe(false);
        expect(result.errors.server).toBe("Errore nell'invio del form");
    });
});

describe('sendRegistration', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('risolve correttamente la registrazione in caso di risposta ok', async () => {
        const fakeResponse = { message: "Registrazione avvenuta con successo" };
        fetch.mockResolvedValue({
            ok: true,
            json: async () => fakeResponse
        });

        const formData = { name: "Test", email: "test@example.com", participants: 1 };
        const result = await sendRegistration(formData);

        expect(result).toEqual(fakeResponse);
        expect(fetch).toHaveBeenCalledWith("https://formspree.io/f/manqbqln", expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }));
    });

    test('lancia un errore con il messaggio del server se la risposta non è ok', async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: async () => ({ error: "Errore generico dal server" })
        });

        const formData = { name: "Test", email: "test@example.com", participants: 1 };

        await expect(sendRegistration(formData))
            .rejects
            .toThrow("Errore generico dal server");
    });

    test('lancia un errore con il messaggio di default se la risposta non contiene un campo error', async () => {
        fetch.mockResolvedValue({
            ok: false,
            json: async () => ({})
        });

        const formData = { name: "Test", email: "test@example.com", participants: 1 };

        await expect(sendRegistration(formData))
            .rejects
            .toThrow("Errore nell'invio del form");
    });
});