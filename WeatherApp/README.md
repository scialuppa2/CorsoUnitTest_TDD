# App Meteo

Questa applicazione web consente all'utente di inserire il nome di una città per visualizzare:
- **Il meteo corrente**
- **Le previsioni per i prossimi 3 giorni**

L'applicazione utilizza l'API di [OpenWeatherMap](https://openweathermap.org/) per ottenere i dati meteo e li mostra in un'interfaccia grafica semplice e responsive.

## Funzionalità

- **Validazione dell'Input:**
  - Verifica che l'input non sia vuoto o composto solo da spazi.
  - Assicura che il nome della città contenga solo lettere (comprese quelle accentate) e spazi, escludendo numeri e caratteri speciali.
  - Effettua il trim dell'input per rimuovere spazi iniziali e finali.

- **Recupero Dati Meteo:**
  - Utilizza l'endpoint `forecast` di OpenWeatherMap per ottenere la previsione a intervalli di 3 ore.
  - Estrae il dato corrente (primo elemento della risposta) e organizza le previsioni per i prossimi 3 giorni.
  - Per ogni giorno, viene scelto il dato più vicino a mezzogiorno (12:00) per rappresentare la previsione giornaliera.
  - I dati visualizzati includono:
    - Temperatura
    - Umidità
    - Velocità del vento
    - Descrizione del meteo
    - **Icona meteo:** utilizzando il codice icona fornito dalla API, vengono visualizzate immagini rappresentative del meteo corrente e delle previsioni.

- **Visualizzazione dei Dati:**
  - Il meteo corrente e il forecast vengono mostrati in sezioni separate all'interno della pagina.
  - Vengono visualizzati messaggi di stato per indicare il caricamento dei dati, eventuali errori o l'aggiornamento riuscito.

## Struttura del Progetto

Meteo-Test/ 
├── index.html # Interfaccia utente principale 
├── styles.css # Stili CSS per l'interfaccia 
├── package.json # Configurazione del progetto Node.js 
├── jest.config.cjs # Configurazione di Jest (CommonJS) per i test 
├── src/ │ └── weatherApp.js # Funzioni principali: validazione, fetch dei dati, visualizzazione 
└── tests/ └── weatherApp.test.js # Test automatizzati (TDD) con Jest


## Test e TDD

Il progetto è stato sviluppato seguendo il metodo **Test-Driven Development (TDD)**.  
Sono stati implementati test per:

1. **Validazione dell'Input:**
   - Verifica che l'input non sia vuoto.
   - Verifica che l'input non sia composto solo da spazi.
   - Verifica che l'input venga "trimmato" correttamente.
   - Verifica che l'input non contenga numeri o caratteri speciali, ma accetti caratteri accentati.

2. **Richieste API:**
   - Simulazione di risposte positive (dati meteo corretti).
   - Gestione degli errori: città non trovata, timeout e errori di rete.
   - Verifica del formato della risposta (inclusi dati mancanti).

3. **Visualizzazione dei Dati:**
   - Verifica che i dati meteo (correnti e forecast) vengano mostrati correttamente nel DOM.
   - Verifica che i messaggi di errore e di stato siano visualizzati correttamente.
   - Test dell'aggiornamento dinamico del DOM.

I test sono stati scritti con **Jest** e, per i test del DOM, è stato utilizzato l'ambiente **jsdom**.  
Per eseguire i test, usa il comando:

```bash
npm test


