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
