const {
    calcolaMedia,
    calcolaMediana,
    calcolaModa,
    calcolaVarianza,
    calcolaDeviazioneStandard
} = require('../src/UnitTestLibrary');

describe('UnitTestLibrary', () => {

    // TEST PER LA MEDIA
    describe('media', () => {
        beforeEach(() => {
        });

        test('Should return the mean of an array of numbers', () => {
            const result = calcolaMedia([1, 2, 3, 4, 5]);
            expect(result).toBe(3);
        });

        test('Should handle an array with a single number', () => {
            const result = calcolaMedia([10]);
            expect(result).toBe(10);
        });

        test('Should return 0 for an empty array', () => {
            const result = calcolaMedia([]);
            expect(result).toBe(0);
        });

        test('Should handle an array with negative numbers', () => {
            const result = calcolaMedia([-1, -2, -3, -4, -5]);
            expect(result).toBe(-3);
        });

        test('Should handle an array with floating point numbers', () => {
            const result = calcolaMedia([1.5, 2.5, 3.5]);
            expect(result).toBe(2.5);
        });
    });

    // TEST PER LA MEDIANA
    describe('mediana', () => {
        beforeEach(() => {
        });

        test('Should return the middle value for an odd number of elements', () => {
            const result = calcolaMediana([1, 3, 2]);
            expect(result).toBe(2);
        });

        test('Should return the average of two middle values for an even number of elements', () => {
            const result = calcolaMediana([1, 2, 3, 4]);
            expect(result).toBe(2.5);
        });

        test('Should return 0 for an empty array', () => {
            const result = calcolaMediana([]);
            expect(result).toBe(0);
        });

        test('Should handle an array with negative numbers', () => {
            const result = calcolaMediana([-3, -1, -2]);
            expect(result).toBe(-2);
        });

        test('Should handle an array with floating point numbers', () => {
            const result = calcolaMediana([1.2, 2.5, 3.1]);
            expect(result).toBe(2.5);
        });
    });

    // TEST PER LA MODA
    describe('moda', () => {
        beforeEach(() => {
        });

        test('Should return the most frequent value in the array', () => {
            const result = calcolaModa([1, 2, 2, 3, 3, 3]);
            expect(result).toBe(3);
        });

        test('Should handle multiple modes by returning the first one', () => {
            const result = calcolaModa([1, 1, 2, 2]);
            expect(result).toBe(1);
        });

        test('Should return null for an empty array', () => {
            const result = calcolaModa([]);
            expect(result).toBe(null);
        });

        test('Should handle arrays with negative numbers', () => {
            const result = calcolaModa([-1, -1, -2, -2, -2]);
            expect(result).toBe(-2);
        });
    });

    // TEST PER LA VARIANZA
    describe('varianza', () => {
        // test('Should return the variance of an array of numbers', () => {
        //     const result = calcolaVarianza([1, 2, 3, 4, 5]);
        //     expect(result).toBeCloseTo(2.5, 4);
        // });

        // test('Should handle an array with negative numbers', () => {
        //     const result = calcolaVarianza([-1, -2, -3, -4, -5]);
        //     expect(result).toBeCloseTo(2.5, 4);
        // });

        test('Should handle an array with floating point numbers', () => {
            const result = calcolaVarianza([1.5, 2.5, 3.5]);
            expect(result).toBeCloseTo(0.6667, 4);
        });
    });

    // TEST PER LA DEVIAZIONE STANDARD
    describe('deviazione standard', () => {
        // test('Should return the standard deviation of an array of numbers', () => {
        //     const result = calcolaDeviazioneStandard([1, 2, 3, 4, 5]);
        //     expect(result).toBeCloseTo(1.5811, 4);
        // });

        // test('Should handle an array with negative numbers', () => {
        //     const result = calcolaDeviazioneStandard([-1, -2, -3, -4, -5]);
        //     expect(result).toBeCloseTo(1.5811, 4);
        // });

        test('Should handle an array with floating point numbers', () => {
            const result = calcolaDeviazioneStandard([1.5, 2.5, 3.5]);
            expect(result).toBeCloseTo(0.8165, 4);
        });
    });
    

});
