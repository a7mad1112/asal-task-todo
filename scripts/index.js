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