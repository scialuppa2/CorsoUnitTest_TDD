//Implementazione delle Funzioni Statistiche

//Implementare la funzione per calcolare la media per passare i test scritti

//Implementare le funzioni successive per mediana, moda, varianza e deviazione standard


function calcolaMedia(arr) {
    if (arr.length === 0) return 0;
    const somma = arr.reduce((acc, num) => acc + num, 0);
    return somma / arr.length;
}


function calcolaMediana(array) {
    if (array.length === 0) return 0;

    const sortedArray = [...array].sort((a, b) => a - b);
    const middle = Math.floor(sortedArray.length / 2);

    if (sortedArray.length % 2 === 0) {
        
        return (sortedArray[middle - 1] + sortedArray[middle]) / 2;
    } else {
        
        return sortedArray[middle];
    }
}


function calcolaModa(array) {
    if (array.length === 0) return null;
    const freq = {};
    array.forEach(num => freq[num] = (freq[num] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    const moda = Object.keys(freq).find(key => freq[key] === maxFreq);
    return parseFloat(moda);
}


function calcolaVarianza(array) {
    if (!array.length) return 0;
    const media = array.reduce((acc, val) => acc + val, 0) / array.length;
    return array.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / array.length;
}

function calcolaDeviazioneStandard(array) {
    const varianza = calcolaVarianza(array);
    return Math.sqrt(varianza);
}



module.exports = {
    calcolaMedia,
    calcolaMediana,
    calcolaModa,
    calcolaVarianza,
    calcolaDeviazioneStandard
};
