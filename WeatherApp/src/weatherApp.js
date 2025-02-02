/**
 * Verifica che il nome della città sia valido:
 * - Deve essere una stringa
 * - Viene eseguito il trim per rimuovere spazi iniziali e finali
 * - Non deve essere vuota
 * - Deve contenere solo lettere (inclusi caratteri accentati) e spazi
 */
  function validateCityName(city) {
    if (typeof city !== 'string') return false;
    
    const trimmedCity = city.trim();
    if (trimmedCity.length === 0) return false;
    
    // Regex: accetta lettere (anche accentate) e spazi
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regex.test(trimmedCity);
  }
  
  const API_KEY = 'cb0406b83ffff909439df9bffab72fdd';

  /**
   * Recupera i dati meteo dalla API di OpenWeatherMap.
   * Utilizza l'endpoint forecast per ottenere i dati meteo a intervalli di 3 ore.
   * Organizza i dati in due sezioni:
   *   - current: il meteo corrente (primo elemento)
   *   - forecast: un array con la previsione per i prossimi 3 giorni (uno per giorno)
   *
   * Se si verifica un errore (es. città non trovata, errori di rete), viene lanciata un'eccezione.
   */
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=it`;
    
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Città non trovata');
      }
  
      const data = await response.json();
  
      // Controlla che la risposta abbia il formato atteso
      if (!data.list || !data.list.length) {
        throw new Error('Formato della risposta non corretto');
      }
  
      // Primo elemento: meteo corrente (o il dato più vicino)
      const currentData = data.list[0];
      const current = {
        temp: currentData.main.temp,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        dateTime: currentData.dt_txt
      };
  
      // Elaboriamo il forecast per i prossimi 3 giorni (escludendo il giorno corrente)
      const forecast = [];
      const currentDate = new Date(currentData.dt_txt).toISOString().slice(0, 10);
  
      // Utilizziamo un oggetto per raggruppare i dati per data
      const dailyData = {};
  
      data.list.forEach(item => {
        const date = new Date(item.dt_txt).toISOString().slice(0, 10);
        if (date === currentDate) return; // Escludi il giorno corrente
  
        // Se non abbiamo ancora registrato dati per questa data, inizializza l'array
        if (!dailyData[date]) {
          dailyData[date] = [];
        }
        dailyData[date].push(item);
      });
  
      // Per ogni giorno, scegliamo il dato più vicino a mezzogiorno (12:00:00)
      const dates = Object.keys(dailyData).sort();
      // Limitiamoci ai primi 3 giorni
      for (let i = 0; i < Math.min(3, dates.length); i++) {
        const date = dates[i];
        const items = dailyData[date];
  
        // Trova l'elemento che ha orario più vicino a mezzogiorno
        const targetHour = 12;
        let closestItem = items[0];
        let minDiff = Math.abs(new Date(closestItem.dt_txt).getHours() - targetHour);
  
        items.forEach(item => {
          const diff = Math.abs(new Date(item.dt_txt).getHours() - targetHour);
          if (diff < minDiff) {
            closestItem = item;
            minDiff = diff;
          }
        });
  
        forecast.push({
          date,
          temp: closestItem.main.temp,
          humidity: closestItem.main.humidity,
          windSpeed: closestItem.wind.speed,
          description: closestItem.weather[0].description,
          icon: closestItem.weather[0].icon,
        });
      }
  
      return { current, forecast };
  
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Aggiorna il DOM per mostrare i dati meteo all'utente.
   * Visualizza la sezione per il meteo corrente e quella per le previsioni.
   */
  function displayWeatherData(data) {
        const weatherDiv = document.getElementById('weather');
        if (!weatherDiv) return;

        const iconUrl = `https://openweathermap.org/img/wn/${data.current.icon}@2x.png`;

        // Crea la sezione per il meteo corrente
        const currentHTML = `
        <h2>Meteo Corrente</h2>
        <img src="${iconUrl}" alt="Icona meteo">
        <p>Temperatura: ${data.current.temp} °C</p>
        <p>Umidità: ${data.current.humidity} %</p>
        <p>Velocità del vento: ${data.current.windSpeed} m/s</p>
        <p>Descrizione: ${data.current.description}</p>
        <p><small>${data.current.dateTime}</small></p>
        `;


        // Crea la sezione per il forecast
        let forecastHTML = '<h2>Previsioni per i prossimi 3 giorni</h2>';
        data.forecast.forEach(day => {
            const forecastIconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

            forecastHTML += `
            <div class="day">
                <h3>${day.date}</h3>
                <img src="${forecastIconUrl}" alt="Icona meteo">
                <p>Temperatura: ${day.temp} °C</p>
                <p>Umidità: ${day.humidity} %</p>
                <p>Velocità del vento: ${day.windSpeed} m/s</p>
                <p>Descrizione: ${day.description}</p>
            </div>
            `;
        });

        weatherDiv.innerHTML = currentHTML + forecastHTML;
    }

  
  /**
   * Aggiorna il DOM per mostrare messaggi di stato o errori all'utente.
   * Inserisce il messaggio nella sezione con id="status".
   */
  function displayStatusMessage(message) {
    const statusDiv = document.getElementById('status');
    if (statusDiv) {
      statusDiv.textContent = message;
    }
  }
  
  
  module.exports = {
    validateCityName,
    fetchWeatherData,
    displayWeatherData,
    displayStatusMessage,
  };
  
  