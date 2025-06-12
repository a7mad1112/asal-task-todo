const generateId = () => crypto.randomUUID();

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
};

let tasks = loadTasks();
if (tasks.length === 0) {
  tasks = [
    {
      title: "welcome to todo task manager",
      completed: true,
      id: generateId(),
    },
    { title: "second task to try", completed: false, id: generateId() },
  ];
  saveTasks();
}

const addTaskButton = document.getElementById("addNewTaskButton");
const taskInputField = document.getElementById("todoInputField");
const errorMessage = document.getElementById("errorMessage");
const taskListContainer = document.getElementById("taskList");

let currentFilter = "all";

const validateTask = (taskText) => {
  if (taskText.trim() === "") return "Task cannot be empty.";
  if (/^\d/.test(taskText)) return "Task must not start with a number.";
  if (taskText.trim().length < 5)
    return "Task must be at least 5 characters long.";
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
    id: generateId(),
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInputField.value = "";
  errorMessage.textContent = "";
  addTaskButton.disabled = true;
};

const renderTasks = () => {
  taskListContainer.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "done") return task.completed;
    if (currentFilter === "todo") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;
    if (task.completed) titleSpan.classList.add("task-completed");

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fas fa-pencil-alt"></i>`;
    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Edit your task", task.title);
      if (newTitle && validateTask(newTitle) === "") {
        task.title = newTitle;
        saveTasks();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskDiv.append(checkbox, titleSpan, editBtn, deleteBtn);
    taskListContainer.appendChild(taskDiv);
  });
};

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.getAttribute("data-filter");
    renderTasks();
  });
});

taskInputField.addEventListener("focus", () => {
  if (taskInputField.value.trim() === "") {
    errorMessage.textContent = "Task cannot be empty.";
    addTaskButton.disabled = true;
  }
});

taskInputField.addEventListener("blur", checkInputValidity);
taskInputField.addEventListener("input", checkInputValidity);
addTaskButton.addEventListener("click", addTask);

window.onload = () => renderTasks();
