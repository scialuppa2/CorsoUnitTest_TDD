export function validateName(name) {
    if (typeof name !== 'string' || name.trim().length < 3) {
        return "Il nome deve essere lungo almeno 3 caratteri.";
    }
    return null;
}

export function validateEmail(email) {
    if (typeof email !== 'string' || email.trim().length === 0) {
        return "L'email deve essere valida e contenere un '@' e un dominio.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "L'email deve essere valida e contenere un '@' e un dominio.";
    }

    return null;
}


export function validateParticipants(num) {
    if (typeof num !== 'number' && typeof num !== 'string') {
        return "Il numero di partecipanti deve essere un intero compreso tra 1 e 10.";
    }
    const n = Number(num);
    if (!Number.isInteger(n) || n < 1 || n > 10) {
        return "Il numero di partecipanti deve essere un intero compreso tra 1 e 10.";
    }
    return null;
}
