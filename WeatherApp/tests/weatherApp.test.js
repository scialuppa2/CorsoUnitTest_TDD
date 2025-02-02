jest.mock('../src/weatherApp', () => {
  const originalModule = jest.requireActual('../src/weatherApp');
  return {
    ...originalModule,
    fetchWeatherData: jest.fn(),
  };
});

const {
  validateCityName,
  fetchWeatherData,
  displayWeatherData,
  displayStatusMessage,
} = require('../src/weatherApp');

describe('Test WeatherApp', () => {

  // TEST PER LA VALIDAZIONE DELL'INPUT
  describe('Validazione Input', () => {
    test('Non deve essere vuoto', () => {
      expect(validateCityName('')).toBe(false);
    });

    test('Non deve essere composto solo da spazi bianchi', () => {
      expect(validateCityName('   ')).toBe(false);
    });

    test('Deve effettuare il trim dell\'input', () => {
      expect(validateCityName('   Milano   ')).toBe(true);
    });

    test('Non deve contenere numeri o caratteri speciali', () => {
      expect(validateCityName('Roma')).toBe(true);
      expect(validateCityName('New York')).toBe(true);
      expect(validateCityName('Parigi123')).toBe(false);
      expect(validateCityName('Milano!')).toBe(false);
    });

    test('Deve accettare caratteri accentati', () => {
      expect(validateCityName('São Paulo')).toBe(true);
      expect(validateCityName('Montréal')).toBe(true);
    });
  });

  // TEST PER LE RICHIESTE API
  describe('Richieste API', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('Dovrebbe restituire i dati meteo se la città esiste', async () => {
      fetchWeatherData.mockResolvedValue({
        temp: 25,
        humidity: 60,
        windSpeed: 10,
        description: 'Soleggiato',
      });

      const data = await fetchWeatherData('Roma');
      expect(data.temp).toBe(25);
      expect(data.humidity).toBe(60);
      expect(data.windSpeed).toBe(10);
      expect(data.description).toBe('Soleggiato');
    });

    test('Dovrebbe gestire errori quando la città non è trovata', async () => {
      fetchWeatherData.mockRejectedValue(new Error('Città non trovata'));
      await expect(fetchWeatherData('CittàFalsa')).rejects.toThrow('Città non trovata');
    });

    test('Dovrebbe gestire un timeout della richiesta', async () => {
      fetchWeatherData.mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Timeout')), 100);
          })
      );
      await expect(fetchWeatherData('Milano')).rejects.toThrow('Timeout');
    });

    test('Dovrebbe gestire errori di rete', async () => {
      fetchWeatherData.mockRejectedValue(new Error('Errore di rete'));
      await expect(fetchWeatherData('Roma')).rejects.toThrow('Errore di rete');
    });

    test('Dovrebbe gestire risposte con formato non corretto', async () => {
      // Simulazione di risposta con dati mancanti
      fetchWeatherData.mockResolvedValue({
        temp: 18,
        humidity: 55,
      });
      const data = await fetchWeatherData('Torino');
      // Simulazione di un oggetto incompleto.
      expect(data.temp).toBe(18);
      expect(data.humidity).toBe(55);
      expect(data.windSpeed).toBeUndefined();
      expect(data.description).toBeUndefined();
    });
  });

  // TEST PER LA VISUALIZZAZIONE DEI DATI
  describe('Visualizzazione dei Dati Meteo', () => {
    beforeEach(() => {

      document.body.innerHTML = `
          <div id="weather"></div>
          <div id="status"></div>
        `;
    });

    test('Dovrebbe mostrare correttamente il meteo corrente e le previsioni per i prossimi 3 giorni', () => {
      const weatherData = {
        current: {
          temp: 20,
          humidity: 50,
          windSpeed: 5,
          description: 'Nuvoloso',
          dateTime: '2025-02-02',
        },
        forecast: [
          { date: '2025-02-03', temp: 15, humidity: 60, windSpeed: 4, description: 'Soleggiato' },
          { date: '2025-02-04', temp: 18, humidity: 55, windSpeed: 5, description: 'Poco nuvoloso' },
          { date: '2025-02-05', temp: 16, humidity: 58, windSpeed: 6, description: 'Pioggia leggera' },
        ],
      };

      displayWeatherData(weatherData);
      const weatherDiv = document.getElementById('weather');

      // Controllo dei dati del meteo corrente
      expect(weatherDiv.textContent).toContain('Meteo Corrente');
      expect(weatherDiv.textContent).toContain('20 °C');
      expect(weatherDiv.textContent).toContain('50 %');
      expect(weatherDiv.textContent).toContain('5 m/s');
      expect(weatherDiv.textContent).toContain('Nuvoloso');
      expect(weatherDiv.textContent).toContain('2025-02-02');

      // Controllo delle previsioni per i prossimi 3 giorni
      expect(weatherDiv.textContent).toContain('Previsioni per i prossimi 3 giorni');

      expect(weatherDiv.textContent).toContain('2025-02-03');
      expect(weatherDiv.textContent).toContain('15 °C');
      expect(weatherDiv.textContent).toContain('Soleggiato');

      expect(weatherDiv.textContent).toContain('2025-02-04');
      expect(weatherDiv.textContent).toContain('18 °C');
      expect(weatherDiv.textContent).toContain('Poco nuvoloso');

      expect(weatherDiv.textContent).toContain('2025-02-05');
      expect(weatherDiv.textContent).toContain('16 °C');
      expect(weatherDiv.textContent).toContain('Pioggia leggera');
    });

    test('Dovrebbe visualizzare messaggi di errore corretti', () => {
      const errorMessage = 'Errore: Città non trovata';
      displayStatusMessage(errorMessage);
      const statusDiv = document.getElementById('status');

      expect(statusDiv.textContent).toContain(errorMessage);
    });

    test('Dovrebbe aggiornare dinamicamente il DOM al cambio di stato', () => {
      displayStatusMessage('Caricamento in corso...');
      let statusDiv = document.getElementById('status');
      expect(statusDiv.textContent).toContain('Caricamento in corso...');

      const weatherData = {
        current: {
          temp: 22,
          humidity: 45,
          windSpeed: 8,
          description: 'Parzialmente nuvoloso',
          dateTime: '2025-02-02',
        },
        forecast: [
          { date: '2025-02-03', temp: 17, humidity: 50, windSpeed: 3, description: 'Soleggiato' },
          { date: '2025-02-04', temp: 19, humidity: 48, windSpeed: 4, description: 'Poco nuvoloso' },
          { date: '2025-02-05', temp: 14, humidity: 55, windSpeed: 5, description: 'Pioggia' },
        ],
      };

      displayWeatherData(weatherData);
      const weatherDiv = document.getElementById('weather');

      expect(weatherDiv.textContent).toContain('22 °C');
      expect(weatherDiv.textContent).toContain('Parzialmente nuvoloso');
    });
  });

})




