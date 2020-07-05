"use strict";
/**
 * Create
 */
const taskTitle = document.getElementById("taskTitle");
const createBtn = document.querySelector("button.btn-create");
createBtn.addEventListener("click", (e) => {
  const endpoint = `/tasks/create`;
  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ title: taskTitle.value }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { statusCode, payload } = data;

      console.log(payload);

      if (statusCode == 200) {
        var tbody = document
          .getElementById("tasks-table")
          .querySelector("tbody");
        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = ` <input type="checkbox" class="form-control-inline" name="status" >`;
        cell2.innerHTML = `  <input
        type="hidden"
        name="_id"
        value="${payload._id}"
      />

      <input
        type="text"
        name="title"
        class="form-control list-title-edit hidden"
        id="taskTitle"
        value="${payload.title}"
        placeholder="Insert task"
      />
      <p class="list-title-view">${payload.title}</p>`;
        cell3.innerHTML = `<button type="submit" class="btn btn-sm btn-success btn-secondary">Update</button>
        <button  data-id="${payload._id}" onclick="return confirm('Are you sure you want to delete this item?');" class="btn btn-sm btn-danger btn-secondary btn-delete">Delete</button>`;

        /**
         * TODO wrap tr with form <form  class="form-inline" method="POST" action="/tasks/update?_method=PUT"">
         * TODO add attribues to tr     <tr class="task" task-id="<%=task._id%>">
         * TODO add event listner to delete btn
         * TODO add event listner to p to show input in dbclick
         */
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * make task editable
 */
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

/**
 * Delete
 */
const deleteBtn = document.querySelector("button.btn-delete");

deleteBtn.addEventListener("click", (e) => {
  const endpoint = `/tasks/delete/${deleteBtn.dataset.id}`;
  fetch(endpoint, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      const row = document.querySelector(`[task-id='${deleteBtn.dataset.id}']`);
      if (data.statusCode == 200) {
        row.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
