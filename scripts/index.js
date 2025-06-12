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
    { title: "welcome to todo task manager", completed: true, id: generateId() },
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
  if (taskText.trim().length < 5) return "Task must be at least 5 characters long.";
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
  const validationErr
