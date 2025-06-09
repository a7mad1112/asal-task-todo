const idGenerator = () => {
    let counter = 1;
    return {
      next: () => counter++,
    };
  };

const idGen = idGenerator();
const tasks = [];

tasks.push({
  title: "welcome to todo task manager",
  completed: true,
  id: idGen.next(),
});
tasks.push({
  title: "welcome to todo task manager",
  completed: false,
  id: idGen.next(),
});

console.log("Initial Data: ",tasks);

const addTaskButton = document.getElementById("addNewTaskButton");
const taskInputField = document.getElementById("todoInputField");
const errorMessage = document.getElementById("errorMessage");

const validateTask = (taskText) => {
    if (taskText.trim() === "") {
      return "Task cannot be empty.";
    }
    if (/^\d/.test(taskText)) {
      return "Task must not start with a number.";
    }
    if (taskText.trim().length < 5) {
      return "Task must be at least 5 characters long.";
    }
    return "";
  };

  const checkInputValidity = () => {
    const taskText = taskInputField.value;
    const validationError = validateTask(taskText);

    if (validationError) {
      errorMessage.textContent = validationError;
      addTaskButton.disabled = true;
    } else {
      errorMessage.textContent = "";
      addTaskButton.disabled = false;
    }
  };

  
  const addTask = () => {
    const taskText = taskInputField.value.trim();
    const validationError = validateTask(taskText);

    if (validationError) {
      errorMessage.textContent = validationError;
      addTaskButton.disabled = true;
      return;
    }

    const newTask = {
      title: taskText,
      completed: false,
      id: idGen.next(),
    };

    tasks.push(newTask);
    console.log("Updated Tasks:", tasks);

    taskInputField.value = "";
    errorMessage.textContent = "";
    addTaskButton.disabled = true;
  };

  
taskInputField.addEventListener("focus", () => {
    if (taskInputField.value.trim() === "") {
      errorMessage.textContent = "Task cannot be empty.";
      addTaskButton.disabled = true;
    }
  });

  taskInputField.addEventListener("blur", () => {
    checkInputValidity();
  });

  taskInputField.addEventListener("input", () => {
    checkInputValidity();
  });

  addTaskButton.addEventListener("click", () => addTask());

  const taskListContainer = document.getElementById("taskList");
  let currentFilter = "all";

  const renderTasks = () => {
  taskListContainer.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "done") return task.completed;
    if (currentFilter === "todo") return !task.completed;
    return true;
  });
  filteredTasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";

    taskDiv.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
      <span class="${task.completed ? 'task-completed' : ''}">${task.title}</span>
      <button onclick="editTask(${task.id})"><i class="fas fa-pencil-alt"></i></button>
      <button onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
    `;

    taskListContainer.appendChild(taskDiv);
    });

    const filterTasks = (filter) => {
    currentFilter = filter;
    renderTasks();
  };
  
};