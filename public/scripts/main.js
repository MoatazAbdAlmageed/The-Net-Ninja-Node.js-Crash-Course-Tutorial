"use strict";
const deleteBtn = document.querySelector("button.btn-delete");

deleteBtn.addEventListener("click", (e) => {
  const endpoint = `/tasks/delete/${deleteBtn.dataset.id}`;
  fetch(endpoint, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      const row = document.querySelector(`[task-id='${deleteBtn.dataset.id}']`);
      if ((data.status = 200)) {
        row.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// make task editable
const tasks = document.querySelectorAll(".task");
tasks.forEach((task) => {
  const viewElement = task.querySelector(".list-title-view");
  const editElement = task.querySelector(".list-edit-view");
  task.addEventListener("dblclick", (e) => {
    editElement.classList.remove("hidden");
    editElement.focus();
    viewElement.classList.add("hidden");
  });

  const taskInputs = task.querySelectorAll(".list-title-edit");
  taskInputs.forEach((taskInput) => {
    taskInput.addEventListener("blur", (e) => {
      e.target.classList.add("hidden");
      viewElement.classList.remove("hidden");
    });
  });
});
