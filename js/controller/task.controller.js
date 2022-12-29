let toDoList = document.querySelector("#todo");
let completedList = document.querySelector("#completed");

// START TASK CONTROL
export let taskControl = {
  remove: () => {},
  toggleTaskCompletion: () => {},
};
// END TASK CONTROL

// START RENDER TASK LIST TO SCREEN
export let renderTask = (taskList) => {
  toDoList.innerText = "";
  completedList.innerText = "";
  taskList.forEach((task) => {
    let taskLi = document.createElement("li");
    let listContent = `
    <span>${task.detail}</span>
    <div class="buttons">
    <button class="remove"><i class="fa-regular fa-trash-can" data-id=${task.id}></i></button>
    <button class="complete">
    <i class="fa-solid fa-circle-check" data-id=${task.id}></i>
    <i class="fa-regular fa-circle-check" data-id=${task.id}></i>
    </button>
    </div>`;
    taskLi.innerHTML = listContent;
    taskLi
      .querySelector(".remove .fa-trash-can")
      .addEventListener("click", taskControl.remove);
    taskLi
      .querySelector(".complete .fa-solid")
      .addEventListener("click", taskControl.toggleTaskCompletion);
    taskLi
      .querySelector(".complete .fa-regular")
      .addEventListener("click", taskControl.toggleTaskCompletion);
    if (task.status == false) return toDoList.append(taskLi);
    completedList.append(taskLi);
  });
};
// END RENDER TASK LIST TO SCREEN

// START FIND MISSING ID
export let findMissingId = (taskList) => {
  if (taskList.length == 0) return 1;
  if (taskList.length == 1) {
    if (taskList[0].id == 1) return 2;
    return 1;
  }

  let taskIdList = [];
  taskList.forEach((task) => {
    taskIdList.push(task.id);
  });
  taskIdList.sort((a, b) => a - b);
  if (taskIdList[0] != 1) return 1;

  for (let i = 0; i < taskIdList.length; i++) {
    if (taskIdList[i] != taskIdList[i + 1] - 1) {
      return i + 2;
    }
  }
};
// END FIND MISSING ID
