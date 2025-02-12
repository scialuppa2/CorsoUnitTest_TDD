import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar";

describe("Test di integrazione - Flusso di ricerca completo", () => {
  const items = ["Mela", "Banana", "Arancia", "Pera", "Ananas", "Mandarino"];

  beforeEach(() => {
    render(<SearchBar items={items} limit={10} />);
  });

  test("Flusso completo di ricerca: inserire un termine e verificare i risultati", () => {
    const input = screen.getByPlaceholderText("Cerca...");
    fireEvent.change(input, { target: { value: "an" } });
  
    const expectedResults = ["Ananas", "Arancia", "Banana", "Mandarino"];
    expectedResults.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  
    
    const excludedResults = ["Mela", "Pera"];
    excludedResults.forEach(item => {
      expect(screen.queryByText(item)).not.toBeInTheDocument();
    });
  });
  

  test("Caso limite: nessun risultato - mostra il messaggio corretto", () => {
    const input = screen.getByPlaceholderText("Cerca...");
    fireEvent.change(input, { target: { value: "xyz" } });

    expect(screen.getByText("Nessun risultato trovato")).toBeInTheDocument();
  });

  test("Caso limite: ricerca vuota - mostra tutti gli elementi", () => {
    const input = screen.getByPlaceholderText("Cerca...");
    
    fireEvent.change(input, { target: { value: "an" } });
    fireEvent.change(input, { target: { value: "" } });

    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
