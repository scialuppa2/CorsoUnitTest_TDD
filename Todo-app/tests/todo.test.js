import { addTask, removeTask, markTaskCompleted } from '../src/todo.js';

test('aggiunge una nuova attività all’elenco', () => {
    const tasks = [];
    const newTask = 'Compra il pane';
    const result = addTask(tasks, newTask);
    expect(result).toEqual([{ task: 'Compra il pane', completed: false }]);
});

test('rimuove un’attività all’indice corretto', () => {
    const tasks = [
        { task: 'Compra il pane', completed: false },
        { task: 'Fai la spesa', completed: false }
    ];
    const result = removeTask(tasks, 0);
    expect(result).toEqual([{ task: 'Fai la spesa', completed: false }]);
});

test('non rimuove un’attività se l’indice è fuori intervallo', () => {
    const tasks = [
        { task: 'Compra il pane', completed: false },
        { task: 'Fai la spesa', completed: false }
    ];
    const result = removeTask(tasks, 5);
    expect(result).toEqual([
        { task: 'Compra il pane', completed: false },
        { task: 'Fai la spesa', completed: false }
    ]);
});

test('segna un’attività come completata', () => {
    const tasks = [
        { task: 'Compra il pane', completed: false },
        { task: 'Fai la spesa', completed: false }
    ];
    const result = markTaskCompleted(tasks, 0);
    expect(result).toEqual([
        { task: 'Compra il pane', completed: true },
        { task: 'Fai la spesa', completed: false }
    ]);
});

test('non modifica attività se l’indice per markTaskCompleted è fuori intervallo', () => {
    const tasks = [
        { task: 'Compra il pane', completed: false },
        { task: 'Fai la spesa', completed: false }
    ];
    const result = markTaskCompleted(tasks, 5);
    expect(result).toEqual([
        { task: 'Compra il pane', completed: false },
        { task: 'Fai la spesa', completed: false }
    ]);
});

test('markTaskCompleted non modifica altre attività', () => {
    const tasks = [
        { task: 'Compra il pane', completed: false },
        { task: 'Fai la spesa', completed: false }
    ];
    markTaskCompleted(tasks, 0);

    expect(tasks).toEqual([
        { task: 'Compra il pane', completed: true },
        { task: 'Fai la spesa', completed: false }
    ]);
});
