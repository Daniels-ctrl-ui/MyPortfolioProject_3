document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'danielsPlannerTasks';
  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const filterButtons = document.querySelectorAll('.task-filter');
  const taskTitleInput = document.getElementById('task-title');
  const taskPriorityInput = document.getElementById('task-priority');
  const taskDateInput = document.getElementById('task-date');

  if (!taskForm || !taskList) {
    return;
  }

  const defaultTasks = [
    {
      id: 1,
      title: 'Review Data Science notes',
      priority: 'High',
      dueDate: '',
      completed: false,
    },
    {
      id: 2,
      title: 'Draft agricultural project ideas',
      priority: 'Medium',
      dueDate: '',
      completed: true,
    }
  ];

  const getTasks = () => {
    const savedTasks = localStorage.getItem(storageKey);

    if (!savedTasks) {
      localStorage.setItem(storageKey, JSON.stringify(defaultTasks));
      return [...defaultTasks];
    }

    try {
      const parsed = JSON.parse(savedTasks);
      return Array.isArray(parsed) && parsed.length ? parsed : [...defaultTasks];
    } catch (error) {
      console.error('Unable to read planner tasks from storage:', error);
      return [...defaultTasks];
    }
  };

  let tasks = getTasks();
  let currentFilter = 'all';

  const updateTaskStatistics = () => {
    const total = tasks.length;
    const pending = tasks.filter((task) => !task.completed).length;
    const completed = tasks.filter((task) => task.completed).length;

    const totalNode = document.getElementById('total-tasks');
    const pendingNode = document.getElementById('pending-tasks');
    const completedNode = document.getElementById('completed-tasks');

    if (totalNode) totalNode.textContent = total;
    if (pendingNode) pendingNode.textContent = pending;
    if (completedNode) completedNode.textContent = completed;
  };

  const saveTasks = () => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'No due date';
    }

    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return 'No due date';
    }

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const escapeHtml = (value) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const renderTasks = () => {
    const filteredTasks = tasks.filter((task) => {
      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true;
    });

    if (!filteredTasks.length) {
      taskList.innerHTML = '<li class="task-item"><div class="task-body"><p class="task-title">No tasks match this filter yet.</p></div></li>';
      updateTaskStatistics();
      return;
    }

    taskList.innerHTML = filteredTasks
      .map(
        (task) => `
          <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-main">
              <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete" />
              <div class="task-body">
                <p class="task-title">${escapeHtml(task.title)}</p>
                <p class="task-meta">${escapeHtml(task.priority)} • ${formatDate(task.dueDate)}</p>
              </div>
            </div>
            <div class="task-actions">
              <button class="icon-button" type="button" data-action="toggle" aria-label="Toggle task">✓</button>
              <button class="icon-button delete" type="button" data-action="delete" aria-label="Delete task">✕</button>
            </div>
          </li>
        `
      )
      .join('');

    updateTaskStatistics();
  };

  const addTask = (event) => {
    event.preventDefault();
    const title = taskTitleInput.value.trim();
    const priority = taskPriorityInput.value;
    const dueDate = taskDateInput.value;

    if (!title) {
      taskTitleInput.focus();
      return;
    }

    tasks.unshift({
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false,
    });

    taskForm.reset();
    taskPriorityInput.value = 'Medium';
    saveTasks();
    renderTasks();
  };

  const toggleTask = (taskId) => {
    tasks = tasks.map((task) =>
      task.id === Number(taskId) ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
  };

  const deleteTask = (taskId) => {
    tasks = tasks.filter((task) => task.id !== Number(taskId));
    saveTasks();
    renderTasks();
  };

  taskForm.addEventListener('submit', addTask);

  taskList.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    const listItem = event.target.closest('.task-item');

    if (!button || !listItem) {
      return;
    }

    const taskId = listItem.dataset.id;
    if (button.dataset.action === 'toggle') {
      toggleTask(taskId);
    }

    if (button.dataset.action === 'delete') {
      deleteTask(taskId);
    }
  });

  taskList.addEventListener('change', (event) => {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (!checkbox) {
      return;
    }

    const listItem = checkbox.closest('.task-item');
    if (!listItem) {
      return;
    }

    toggleTask(listItem.dataset.id);
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      renderTasks();
    });
  });

  renderTasks();
});
