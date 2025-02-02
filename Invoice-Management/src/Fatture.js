const fattureInMemoria = [];

class Fattura {
    constructor(id, cliente, importo, data) {
        this.id = id;
        this.cliente = cliente;
        this.importo = importo;
        this.data = data;
    }
}

// function aggiungiFattura(fattura) {
//     if (!fattura.id || !fattura.cliente || fattura.importo <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(fattura.data)) {
//         throw new Error('Dati fattura non validi');
//     }
//     if (fattura.importo <= 0) {
//         throw new Error('Importo non valido');
//     }
//     fattureInMemoria.push(fattura);
//     return fattura;
// }

function aggiungiFattura(fattura) {
    if (!fattura.id) {
        throw new Error('Dati fattura non validi');
    }
    if (!fattura.cliente) {
        throw new Error('Cliente mancante');
    }
    if (fattura.importo <= 0) {
        throw new Error('Importo non valido');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fattura.data)) {
        throw new Error('Formato data non valido');
    }
    fattureInMemoria.push(fattura);
    return fattura;
}



function modificaFattura(id, nuoviDati) {
    const fattura = fattureInMemoria.find(f => f.id === id);
    if (!fattura) return null;
    Object.assign(fattura, nuoviDati);
    return fattura;
}

function eliminaFattura(id) {
    const indice = fattureInMemoria.findIndex(f => f.id === id);
    if (indice === -1) return false;
    fattureInMemoria.splice(indice, 1);
    return true;
}

function recuperaFatture() {
    return fattureInMemoria;
}


module.exports = { Fattura, fattureInMemoria, aggiungiFattura, modificaFattura, eliminaFattura, recuperaFatture };

