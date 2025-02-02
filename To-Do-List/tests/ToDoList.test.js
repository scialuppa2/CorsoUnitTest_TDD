
const TodoList = require('../src/TodoList');

describe('To-Do List', () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  test("aggiunge un task alla lista", () => {
    todoList.addTask("Eseguire un esercizio");
    expect(todoList.getTasks()).toEqual([
      { id: expect.any(Number), text: "Eseguire un esercizio", completed: false }
    ]);
  });

  test("non aggiunge un task con testo mancante", () => {
    todoList.addTask(''); 
    expect(todoList.getTasks()).toHaveLength(0); 
  });
  
  test("elimina un task dalla lista", () => {
    todoList.addTask("Eseguire un esercizio");
    const task = todoList.getTasks()[0];
    todoList.deleteTask(task.id);
    expect(todoList.getTasks()).toEqual([]);
  });

  test("non elimina un task se ID inesistente", () => {
    todoList.addTask('Eseguire un esercizio');
    todoList.deleteTask(999); 
    expect(todoList.getTasks()).toHaveLength(1);
  });

  test("segna un task come completato", () => {
    todoList.addTask("Eseguire un esercizio");
    const task = todoList.getTasks()[0];
    todoList.markTaskAsCompleted(task.id);
    expect(todoList.getTasks()).toEqual([
      { id: task.id, text: "Eseguire un esercizio", completed: true }
    ]);
  });

  test("non segna un task come completato se ID inesistente", () => {
    todoList.addTask("Eseguire un esercizio");
    todoList.markTaskAsCompleted(999);
    const task = todoList.getTasks()[0];
    expect(task.completed).toBe(false);
  });
});
