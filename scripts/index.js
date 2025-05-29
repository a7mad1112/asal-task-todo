function* idGenerator() {
  let counter = 1;
  while (true) {
    yield counter++;
  }
}

const idGen = idGenerator();
const fakeData = [];

fakeData.push({
  title: "welcome to todo task manager",
  completed: true,
  id: idGen.next().value,
});
fakeData.push({
  title: "welcome to todo task manager",
  completed: true,
  id: idGen.next().value,
});

console.log(fakeData);
