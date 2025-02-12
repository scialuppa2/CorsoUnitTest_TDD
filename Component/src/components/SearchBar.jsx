import React, { useState, useMemo, useDeferredValue } from 'react';
import filterAndSortResults from "../utils/searchUtils";

const SearchBar = ({ items = [], limit }) => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredResults = useMemo(
    () => filterAndSortResults(items, deferredQuery, limit),
    [items, deferredQuery, limit]
  );

  return (
    <div className="search-container">
      <label htmlFor="search-input">Cerca: </label>
      <input
        id="search-input"
        type="text"
        placeholder="Cerca..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => <li key={item}>{item}</li>)
        ) : (
          <li aria-live="polite">Nessun risultato trovato</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
