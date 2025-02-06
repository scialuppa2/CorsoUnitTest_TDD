function validateName(name) {
    if (typeof name !== 'string' || name.trim().length < 3) {
        return "Il nome deve essere lungo almeno 3 caratteri.";
    }
    return null;
}

function validateEmail(email) {
    if (typeof email !== 'string' || !email.includes('@')) {
        return "L'email deve essere valida e contenere un '@' e un dominio.";
    }

    const parts = email.split('@');
    if (parts.length !== 2 || parts[1].indexOf('.') === -1) {
        return "L'email deve essere valida e contenere un '@' e un dominio.";
    }
    return null;
}

function validateParticipants(num) {

    const n = Number(num);
    if (!Number.isInteger(n) || n < 1 || n > 10) {
        return "Il numero di partecipanti deve essere un intero compreso tra 1 e 10.";
    }
    return null;
}

module.exports = { validateName, validateEmail, validateParticipants };
