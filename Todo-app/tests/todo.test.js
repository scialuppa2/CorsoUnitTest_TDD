import { addTask, removeTask, markTaskCompleted } from '../src/todo.js'

test('aggiunge una nuova attività all’elenco', () => {
    const tasks = [];
    const newTask = 'Compra il pane';
    const result = addTask(tasks, newTask);
    expect(result).toEqual([{ task: 'Compra il pane', completed: false }]);
});