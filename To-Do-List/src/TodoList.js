// class TodoList {
//     constructor() {
//       this.tasks = [];
//       this.nextId = 1;
//     }
  
//     // Metodo per aggiungere un task alla lista
//     addTask(text) {
//       if (!text.trim()) {
//         return;
//       }
//       const task = {
//         id: this.nextId++,
//         text,
//         completed: false,
//       };
//       this.tasks.push(task);
//     }
  
//     // Metodo per ottenere la lista dei task
//     getTasks() {
//       return this.tasks;
//     }
  
//     // Metodo per eliminare un task dato il suo ID
//     deleteTask(id) {
//       this.tasks = this.tasks.filter((task) => task.id !== id);
//     }
  
//     // Metodo per segnare un task come completato dato il suo ID
//     markTaskAsCompleted(id) {
//       const task = this.tasks.find((task) => task.id === id);
//       if (task) {
//         task.completed = true;
//       }
//     }
//   }
  
//   module.exports = TodoList;


// REFACTORING DEL CODICE

class TodoList {
    constructor() {
      this.tasks = [];
      this.nextId = 1;
    }
  
    // Aggiunge un task se il testo è valido
    addTask(text) {
      const trimmedText = text.trim();
      if (!trimmedText) {
        // console.warn("Il testo del task non può essere vuoto.");
        return;
      }
  
      const task = {
        id: this.nextId++,
        text: trimmedText,
        completed: false,
      };
      this.tasks.push(task);
    }
  
    // Restituisce la lista dei task
    getTasks() {
      return [...this.tasks];
    }
  
    // Elimina un task tramite il suo ID
    deleteTask(id) {
      const initialLength = this.tasks.length;
      this.tasks = this.tasks.filter((task) => task.id !== id);
  
      if (this.tasks.length === initialLength) {
        // console.warn(`Task con ID ${id} non trovato.`);
      }
    }
  
    // Segna un task come completato tramite ID
    markTaskAsCompleted(id) {
      const task = this._findTaskById(id);
      if (!task) {
        // console.warn(`Task con ID ${id} non trovato.`);
        return;
      }
      task.completed = true;
    }
  
    // Metodo privato per trovare un task tramite ID
    _findTaskById(id) {
      return this.tasks.find((task) => task.id === id);
    }
  }
  
  module.exports = TodoList;
  
  