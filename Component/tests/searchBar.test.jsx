import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar";

describe("SearchBar Component", () => {
  const items = ["Mela", "Banana", "Arancia", "Pera", "Ananas", "Mandarino"];

  test("Visualizzazione dei risultati iniziali - deve mostrare tutti gli elementi all'inizio", () => {
    render(<SearchBar items={items} limit={10} />);
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("Il campo di ricerca è presente e inizialmente vuoto", () => {
    render(<SearchBar items={items} limit={10} />);
    const input = screen.getByPlaceholderText("Cerca...");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  test("Aggiornamento dinamico dei risultati - deve filtrare i risultati quando si digita", () => {
    render(<SearchBar items={items} limit={10} />);
    fireEvent.change(screen.getByPlaceholderText("Cerca..."), { target: { value: "an" } });
    
    expect(screen.getByText("Ananas")).toBeInTheDocument();
    expect(screen.getByText("Arancia")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  test("Ordine alfabetico - i risultati devono essere ordinati alfabeticamente", () => {
    render(<SearchBar items={items} limit={10} />);
    fireEvent.change(screen.getByPlaceholderText("Cerca..."), { target: { value: "a" } });
  
    const displayedItems = screen.getAllByRole("listitem").map((li) => li.textContent);
    const sortedItems = [...displayedItems].sort();
  
    expect(displayedItems).toEqual(sortedItems);
  });  

  test("Gestione dei risultati vuoti - mostra 'Nessun risultato trovato' se nessun elemento corrisponde", () => {
    render(<SearchBar items={items} limit={10} />);
    fireEvent.change(screen.getByPlaceholderText("Cerca..."), { target: { value: "xyz" } });
    expect(screen.getByText("Nessun risultato trovato")).toBeInTheDocument();
  });

  test("Risultati limitati - deve mostrare al massimo 3 risultati", () => {
    render(<SearchBar items={items} limit={3} />);
    
    const displayedItems = screen.getAllByRole("listitem").map((li) => li.textContent);
    const expectedItems = [...items].sort().slice(0, 3);
  
    expect(displayedItems).toEqual(expectedItems);
  });

  test("Risultati limitati - deve mostrare al massimo 5 risultati", () => {
    render(<SearchBar items={items} limit={5} />);
    
    const displayedItems = screen.getAllByRole("listitem").map((li) => li.textContent);
    const expectedItems = [...items].sort().slice(0, 5);
  
    expect(displayedItems).toEqual(expectedItems);
  });

  test("Ripristino dei risultati quando il campo di ricerca viene svuotato", () => {
    render(<SearchBar items={items} limit={10} />);
    const input = screen.getByPlaceholderText("Cerca...");

    fireEvent.change(input, { target: { value: "an" } });
    expect(screen.getByText("Ananas")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "" } });
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

});
