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
  task.addEventListener("dblclick", (e) => {
    task.querySelector(".list-title-edit").classList.remove("hidden");
    task.querySelector(".list-title-edit").focus();
    task.querySelector(".list-title-view").classList.add("hidden");
  });

  const taskInputs = task.querySelectorAll(".list-title-edit");
  taskInputs.forEach((taskInput) => {
    taskInput.addEventListener("blur", (e) => {
      e.target.classList.add("hidden");
      task.querySelector(".list-title-view").classList.remove("hidden");
    });
  });
});
