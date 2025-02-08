import { validateName, validateEmail, validateParticipants } from './validation.js';

export async function sendRegistration(data) {
    const response = await fetch("https://formspree.io/f/manqbqln", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        let errorMessage = "Errore nell'invio del form";
        try {
            const errorData = await response.json();
            if (errorData.error) {
                errorMessage = errorData.error;
            }
        } catch (err) {

        }
        throw new Error(errorMessage);
    }
    return response.json();
}


export async function handleFormSubmit(formData) {
    const errors = {};

    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const participantsError = validateParticipants(formData.participants);
    if (participantsError) errors.participants = participantsError;

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    try {
        const result = await sendRegistration(formData);
        return { success: true, result };
    } catch (err) {
        return { success: false, errors: { server: err.message } };
    }
}
