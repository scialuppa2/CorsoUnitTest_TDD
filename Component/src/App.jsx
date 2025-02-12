import React from 'react';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const items = ["Mela", "Banana", "Arancia", "Pera", "Ananas", "Mandarino"]; 

  return (
    <>
      <div>
        <h1>Test SearchBar</h1>
        <SearchBar items={items} limit={5} />
      </div>
    </>
  );
}

export default App;
