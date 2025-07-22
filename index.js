// Select elements
const input = document.querySelector('.addInput');
const addButton = document.querySelector('.addBtn');
const taskContainer = document.querySelector('.taskContainer');

// Array to hold task objects
let tasks = getFromLocalStorage();
renderTasks();

// Event listener for "ADD" button
addButton.onclick = function () {
  const taskText = input.value.trim();
  if (taskText !== "") {
    const task = {
      id: Date.now(),
      title: taskText,
      completed: false
    };
    tasks.push(task);
    input.value = "";
    addToLocalStorage(tasks);
    renderTasks();
  }
};

// Function to render tasks in DOM
function renderTasks() {
  taskContainer.innerHTML = ""; // Clear current tasks

  tasks.forEach((task) => {
    // Create task wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('taskLabel');

    // Task content
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.textContent = task.title;
    if (task.completed) {
      taskDiv.style.textDecoration = 'line-through';
      taskDiv.style.opacity = '0.6';
    }

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<img src="icons8-done-50.png" alt="Complete">';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      addToLocalStorage(tasks); // Save updated state
      renderTasks();
    };

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deletebtn');
    deleteBtn.innerHTML = '<img src="icons8-delete-30.png" alt="Delete">';
    deleteBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      addToLocalStorage(tasks); // Save updated state
      renderTasks();
    };

    // Append everything
    wrapper.appendChild(taskDiv);
    wrapper.appendChild(completeBtn);
    wrapper.appendChild(deleteBtn);
    taskContainer.appendChild(wrapper);
  });
}

// Save tasks to localStorage
function addToLocalStorage(todo) {
  localStorage.setItem('tasks', JSON.stringify(todo));
}

// Load tasks from localStorage
function getFromLocalStorage() {
  try {
    const todos = JSON.parse(localStorage.getItem('tasks'));
    return Array.isArray(todos) ? todos : [];
  } catch (e) {
    return [];
  }
}
