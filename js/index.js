import {
  findMissingId,
  renderTask,
  taskControl,
} from "./controller/task.controller.js";
import { Task } from "./model/task.model.js";
import { enterToActive } from "./utils/utils.js";

const LOCALSTORAGE_TODOLIST = "TODOLIST";
let tempTaskList = localStorage.getItem(LOCALSTORAGE_TODOLIST);
let taskList = [];
let completedTaskList = [];
let isFilter = false;

// START TOGGLE TASK COMPLETION
taskControl.toggleTaskCompletion = (e) => {
  //   console.log("yes");
  let taskID = e.target.dataset.id;
  let taskIndex = taskList.findIndex((task) => task.id == taskID);
  if (taskList[taskIndex].status == false) {
    taskList[taskIndex].status = true;
  } else {
    taskList[taskIndex].status = false;
  }
  localStorage.setItem(LOCALSTORAGE_TODOLIST, JSON.stringify(taskList));

  if (isFilter) return renderTask(completedTaskList);
  renderTask(taskList);
};
// END TOGGLE TASK COMPLETION

// START REMOVE TASK
taskControl.remove = (e) => {
  //   console.log("yes");
  let taskID = e.target.dataset.id;
  let taskIndex = taskList.findIndex((task) => task.id == taskID);
  taskList.splice(taskIndex, 1);
  localStorage.setItem(LOCALSTORAGE_TODOLIST, JSON.stringify(taskList));

  if (isFilter) {
    let completedTaskIndex = completedTaskList.findIndex(
      (task) => task.id == taskID
    );
    completedTaskList.splice(completedTaskIndex, 1);
    renderTask(completedTaskList);
    return;
  }
  renderTask(taskList);
};
// END REMOVE TASK

// START RENDER TASKLIST TO SCREEN
if (tempTaskList != null) {
  taskList = JSON.parse(tempTaskList);
  taskList = taskList.map((task) => {
    return new Task(task.id, task.detail, task.status);
  });
  renderTask(taskList);
}
// END RENDER TASKLIST TO SCREEN

// START ADD TASK
enterToActive("#newTask", "#addItem");
document.querySelector("#addItem").addEventListener("click", () => {
  let newTaskID = findMissingId(taskList);
  let newTaskDetail = document.querySelector("#newTask").value;
  let newTask = new Task(newTaskID, newTaskDetail, false);

  taskList.push(newTask);
  localStorage.setItem(LOCALSTORAGE_TODOLIST, JSON.stringify(taskList));

  document.querySelector("#newTask").value = "";

  if (isFilter) {
    completedTaskList.push(newTask);
    renderTask(completedTaskList);
    return;
  }
  renderTask(taskList);
});
// END ADD TASK

// START SORT TASK LIST
// start sort A --> Z
document.querySelector("#two").addEventListener("click", () => {
  taskList.sort((a, b) => {
    const detailA = a.detail.toLowerCase();
    const detailB = b.detail.toLowerCase();
    if (detailA < detailB) return -1;
    if (detailA > detailB) return 1;
    return 0;
  });
  localStorage.setItem(LOCALSTORAGE_TODOLIST, JSON.stringify(taskList));

  if (isFilter) {
    completedTaskList.sort((a, b) => {
      const detailA = a.detail.toLowerCase();
      const detailB = b.detail.toLowerCase();
      if (detailA < detailB) return -1;
      if (detailA > detailB) return 1;
      return 0;
    });
    renderTask(completedTaskList);
    return;
  }
  renderTask(taskList);
});
// end sort A --> Z

// start sort Z --> A
document.querySelector("#three").addEventListener("click", () => {
  taskList.sort((a, b) => {
    const detailA = a.detail.toLowerCase();
    const detailB = b.detail.toLowerCase();
    if (detailA < detailB) return 1;
    if (detailA > detailB) return -1;
    return 0;
  });
  localStorage.setItem(LOCALSTORAGE_TODOLIST, JSON.stringify(taskList));

  if (isFilter) {
    completedTaskList.sort((a, b) => {
      const detailA = a.detail.toLowerCase();
      const detailB = b.detail.toLowerCase();
      if (detailA < detailB) return 1;
      if (detailA > detailB) return -1;
      return 0;
    });
    renderTask(completedTaskList);
    return;
  }
  renderTask(taskList);
});
// end sort Z --> A
// END SORT TASK LIST

// START FILTER TASK
document.querySelector("#one").addEventListener("click", () => {
  completedTaskList = taskList.filter((task) => task.status == true);
  renderTask(completedTaskList);
  isFilter = true;
});
// END FILTER TASK

// START TURN OFF TASK FILTER
document.querySelector("#all").addEventListener("click", () => {
  renderTask(taskList);
  isFilter = false;
});
// END TURN OFF TASK FILTER
