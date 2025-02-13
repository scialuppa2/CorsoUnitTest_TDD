export function addTask(tasks, task) {
    if (task.length === 0) return tasks;
    tasks.push({ task, completed: false });
    return tasks;
}

export function removeTask(tasks, index) {
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }

    return tasks;
}

export function markTaskCompleted(tasks, index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
    }
    return tasks;
}


