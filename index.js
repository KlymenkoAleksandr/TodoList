

function renderTask (task) {
    return `
        <div class="task-list__item" data-id=${task.id}>
            <label>
                <input type="checkbox" name="checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-list__item__title ">${task.title}</div>
                <div class="task-list__item__priority ${task.priority}">${task.priority} Priority</div>
                <div class="task-list__item__date">
                    <img src="./images/price.png" alt="">
                    ${task.date}
                </div>
                <div class="task-list__item__status ">
                </div>
            </label>
            <img src="./images/garbage.png" alt="" data-action="remove">
        </div>

    `;
} 

function renderTasks (tasks) {
    const tasksToRender = [];

    for (let i = 0; i < tasks.length; i++) {
        const taskHTML = renderTask(tasks[i]);

        tasksToRender.push(taskHTML);
    }

    return tasksToRender.join('');
}

const todoApp = new ToDoList ([
    new Task(
        'Standup meeting with the team @5pm',
        PRIORITIES.LOW,
        '2020-07-10'
    ),
    new Task(
        'Order pizza for Granny tonight',
        PRIORITIES.MEDIUM,
        '2020-07-10'
    ),
    new Task(
        'Design, Develop and Deploy Apps to Netlify for Clients',
        PRIORITIES.HIGH,
        '2020-07-10'
    )
]);

const tasksList = document.querySelector('#tasks-list');

function updateTasksList (filterValue) {
    const stats = todoApp.getStats();
    for (let key in stats) {
        const statHTML = document.getElementById(`stats-${key}`);

        statHTML.querySelector('span').innerText = stats[key];
    }
    tasksList.innerHTML = renderTasks(todoApp.getTasksList(filterValue));
}

tasksList.addEventListener('click', function(event) {
    const idAttribute = 'data-id';

    if (event.target.getAttribute('data-action') === 'remove' || event.target.closest('[data-action="remove"]')) {
        
        const id = event.target.closest('[data-id]').getAttribute('data-id');
        todoApp.removeTask(id);
    } else {
        let id = event.target.getAttribute(idAttribute);

        if (!id) {
            id = event.target.closest('[data-id]').getAttribute(idAttribute);
        }
        todoApp.toggle(id);
    }

    updateTasksList(searchField.value);
});

updateTasksList();


const searchField = document.getElementById('search');

searchField.addEventListener('input', function() {
    updateTasksList(searchField.value);
});



const modalTriger = document.getElementById('add-task')

function popupHandler() {
    const modal = document.getElementById('modal');

    const controls = {
        open() {
            modal.classList.add('open');
        },
        close() {
            modal.classList.remove('open');
        }
    };
    return controls;
}

const newTaskModal = popupHandler();


modalTriger.addEventListener('click', function(event) {
    modal.classList.add('open');
});

document.querySelector('.modal').addEventListener('click', newTaskModal.close);

document.querySelector('.task').addEventListener('click', e => e.stopPropagation());

document.querySelector('#clear').addEventListener('click', () => {
    todoApp.clear();

    updateTasksList(searchField.value);
});

const newTaskForm = document.querySelector('#new-task-form');

newTaskForm.addEventListener('submit', function() {
    event.preventDefault();

    const formElements = newTaskForm.elements;

    todoApp.addTask(
        new Task(
            formElements.title.value,
            PRIORITIES[formElements.priority.value],
            formElements.date.value
        )
    );

    formElements.title.value = '';
    formElements.date.value = '';
    formElements.priority.value = 0;

    newTaskModal.close();
    updateTasksList(searchField.value);

});

