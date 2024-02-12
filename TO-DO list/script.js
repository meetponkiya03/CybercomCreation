function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const tasks = getTasks();

  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let dueDate = document.getElementById('due-date').value;
  let priority = document.getElementById('priority').value;
  
  const newTask = { title, description, dueDate, priority };
  const updatedTasks = [...tasks, newTask]; 
  saveTasks(updatedTasks);
  return newTask;
}


function editTask(index, title, description, dueDate, priority) {
  let tasks = getTasks();
  tasks[index] = { title, description, dueDate, priority };
  saveTasks(tasks);
}

function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
}

function loadTasksByPriority() {
  let tasks = getTasks().sort((a, b) => a.priority.localeCompare(b.priority));
  let tableBody = document.getElementById('taskTable');
  tableBody.innerHTML = '';
  tasks.forEach((task, index) => {
      let row = tableBody.insertRow();
      row.innerHTML = `
          <td>${task.title}</td>
          <td>${task.description}</td>
          <td>${task.dueDate}</td>
          <td>${task.priority}</td>
          <td>
              <button onclick="editTaskForm(${index})">Edit</button>
              <button onclick="deleteTask(${index})">Delete</button>
          </td>
      `;
  });
}
function editTaskForm(index) {
  let tasks = getTasks();
  let task = tasks[index];
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('due-date').value = task.dueDate;
  document.getElementById('priority').value = task.priority;
  document.getElementById('submitBtn').setAttribute('onclick', `submitEdit(${index})`);
}

function submitEdit(index) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let dueDate = document.getElementById('due-date').value;
  let priority = document.getElementById('priority').value;
  editTask(index, title, description, dueDate, priority);
  loadTasksByPriority();
  document.getElementById('submitBtn').setAttribute('onclick', 'addTaskFromForm(event)');
  document.getElementById('task-form').reset();
}

document.getElementById('task-form').addEventListener('submit', function(event) {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let dueDate = document.getElementById('due-date').value;
  let priority = document.getElementById('priority').value;
  //addTask(title, description, dueDate, priority);
  loadTasksByPriority();
  this.reset();
});

window.onload = function() {
  loadTasksByPriority();
};
