// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');
const clearTasksBtn = document.getElementById('clear-tasks-btn');

// Load saved tasks from LocalStorage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

// Add a task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToDOM(taskText);
    saveTaskToStorage(taskText);
    taskInput.value = '';
  } else {
    alert('Please enter a task.');
  }
});

// Clear all tasks
clearTasksBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all tasks?')) {
    todoList.innerHTML = '';
    clearTasksFromStorage();
  }
});

// Function to add a task to the DOM
function addTaskToDOM(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Add delete functionality
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    removeTaskFromStorage(taskText);
  });

  todoList.appendChild(li);
}

// Function to save a task to LocalStorage
function saveTaskToStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from LocalStorage
function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from LocalStorage
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToDOM);
}

// Function to clear all tasks from LocalStorage
function clearTasksFromStorage() {
  localStorage.removeItem('tasks');
}
