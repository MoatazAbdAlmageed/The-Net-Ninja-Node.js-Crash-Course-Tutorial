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
      const { statusCode, message, payload } = data;


      if (statusCode == 200) {

        alert(message);

        
        var tbody = document
          .getElementById("tasks-table")
          .querySelector("tbody");
        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = ` <input type="checkbox" class="form-control-inline" name="status" >`;
        cell2.innerHTML = `  <div class="gray">a few seconds ago</div> <input
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
        <button  data-id="${payload._id}" class="btn btn-sm btn-danger btn-secondary btn-delete">Delete</button>`;

        /**
         * TODO wrap tr with form <form  class="form-inline" method="POST" action="/tasks/update?_method=PUT"">
         * TODO add attribues to tr     <tr class="task" task-id="<%=task._id%>">
         * TODO add event listner to delete btn
         * TODO add event listner to p to show input in dbclick
         * TODO increment counter ++ like  [56] Todo
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
  const editElement = task.querySelector(".list-title-edit");
  task.addEventListener("dblclick", (e) => {
    editElement.classList.remove("hidden");
    editElement.focus();
    viewElement.classList.add("hidden");
  });

  const taskInputs = task.querySelectorAll(".list-title-edit");
  taskInputs.forEach((taskInput) => {
    /**
     * TODO check this behavior
     *
     * after uncomment those make sure update,delete action works
     * may you need to add Esc key trigger
     * may add (x) button to exit edit mode
     */
    // taskInput.addEventListener("blur", (e) => {
    //   e.target.classList.add("hidden");
    //   viewElement.classList.remove("hidden");
    // });
  });
});

/**
 * Update
 */
const updateBtns = document.querySelectorAll("button.btn-update");
updateBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const taskId = e.target.parentElement.parentElement.dataset.taskId;
    const taskStatus = e.target.parentElement.parentElement.querySelector(
      '[name="status"]'
    ).value;

    const taskTitle = e.target.parentElement.parentElement.querySelector(
      ".list-title-edit"
    ).value;

    const endpoint = `/tasks/update`;
    fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({
        _id: taskId,
        title: taskTitle,
        status: taskStatus,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { statusCode, message, payload } = data;
        if (statusCode == 200) {
          alert(message);
          /**
           * todo update tow data
           */
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
/**
 * Delete
 */
const deleteBtns = document.querySelectorAll("button.btn-delete");

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const conf = confirm("Are you sure you want to delete this item?");
    if (!conf) {
      return;
    }
    const endpoint = `/tasks/delete/${deleteBtn.dataset.id}`;
    fetch(endpoint, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        const row = document.querySelector(
          `[task-id='${deleteBtn.dataset.id}']`
        );
        if (data.statusCode == 200) {
          row.remove();
          /**
           * * TODO decrement counter ++ like  [56] Todo
           */
        }
      })
      .catch((err) => {
        throw err;
      });
  });
});
