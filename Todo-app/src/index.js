import { addTask, removeTask, markTaskCompleted } from './todo.js'

const tasks = [];
console.log('Lista iniziale:', tasks);

// Aggiunge due attività
addTask(tasks, 'Compra il pane');
addTask(tasks, 'Porta fuori il cane');
console.log('Lista dopo aggiunta:', tasks);

// Rimuove la prima attività
removeTask(tasks, 0);
console.log('Lista dopo rimozione:', tasks);

// Segna come completata l'attività rimanente
markTaskCompleted(tasks, 0);
console.log('Lista dopo completamento:', tasks);