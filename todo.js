const PRIORITIES = {
    LOW: 'low',
    HIGH: 'high',
    MEDIUM: 'medium'
}

function Task (title, priority, date) {
    this.title = title;
    this.priority = priority;
    this.date = date;

    this.id = String(Math.random()).slice(2, 9);
    this.completed = false;
}

Task.prototype.toggle = function () {
    this.completed = !this.completed;
}

Task.prototype.isCompleted = function() {
    return this.completed;
}

function ToDoList (initialTasks) {
    this.tasks = initialTasks;
}

ToDoList.prototype.addTask = function (task) {
    this.tasks.push(task);
}

ToDoList.prototype.findTaskById = function (id) {
    for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) {
            return {
                task: this.tasks[i],
                index: i
            };
        }
    }

    return {
        task: null,
        index: -1
    };
}

ToDoList.prototype.removeTask = function (id) {
    const currentTasks = this.findTaskById(id);
    this.tasks.splice(currentTasks.index, 1);
}

ToDoList.prototype.toggle = function (id) {
    const currentTasks = this.findTaskById(id);

    currentTasks.task.toggle();
}

ToDoList.prototype.getTasksList = function (filter) {
    if (!filter) {
        return this.tasks;
    }

    const result = [];

    for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].title.toLowerCase().includes(filter.toLowerCase())) {
            result.push(this.tasks[i]);
        }
    }

    return result;
}

ToDoList.prototype.getStats = function() {
    const allTasks = this.tasks.length;
    let completed = 0;

    for (let i = 0; i < allTasks; i++) {
        if ( this.tasks[i].isCompleted() ) {
            completed++;
        }
    }
    const pending = allTasks - completed;
    return {
        total: allTasks,
        completed,
        pending,
    }
}

ToDoList.prototype.clear = function() {
    this.tasks.length = 0;
}