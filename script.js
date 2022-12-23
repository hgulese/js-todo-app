const ul = document.getElementById("task-list");
const btnAdd = document.getElementById("btnAddNewTask");
const btnClear = document.getElementById("btnClear");
const txtTaskName = document.querySelector("#txtTaskName");

let taskList = [
    { "id": 1, "taskName": "Task 1", "status": "completed" },
    { "id": 2, "taskName": "Task 2", "status": "pending" },
    { "id": 3, "taskName": "Task 3", "status": "completed" },
    { "id": 4, "taskName": "Task 4", "status": "pending" },
];

let editId;
let isEditTask = false;

displayTask();

function displayTask() {
    ul.innerHTML = "";

    if (taskList.length != 0) {
        for (let task of taskList) {
            let completed = task.status == "completed" ? "checked" : "";

            let li = `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input type="checkbox" onClick="updateStatus(this)" id="${task.id}" class="form-check-input" ${completed}>
                        <label for="${task.id}" class="form-check-label ${completed}">${task.taskName}</label>
                    </div>
    
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a onClick='updateTask(${task.id}, "${task.taskName}")' class="dropdown-item"><i class="fa-solid fa-pen-to-square"></i> Edit</a><li>
                            <li><a onClick="deleteTask(${task.id})" class="dropdown-item"><i class="fa-solid fa-trash-can"></i> Delete</a></li>
                        </ul>
                    </div>
                </li>
            `;

            ul.insertAdjacentHTML("beforeend", li);
        }
    } else {
        ul.innerHTML = "<p class='p-3 m-0'>Your task list is empty.</p>"
    }
}

btnAdd.addEventListener("click", (event) => {

    btnAdd.innerHTML = "Add";

    if (txtTaskName.value != "") {
        if (!isEditTask) {
            // add
            taskList.push({ "id": taskList.length + 1, "taskName": txtTaskName.value });
        } else {
            // update
            for (let task of taskList) {
                if (task.id == editId) {
                    task.taskName = txtTaskName.value;
                }
                isEditTask = false;
            }
        }
        displayTask();

        txtTaskName.value = "";
    } else {
        alert("Please! Enter a task name.");
    }

    event.preventDefault();
});

function deleteTask(id) {
    let deleteId;

    // for (let index in taskList) {
    //     if (taskList[index].id == id) {
    //         deleteId = index;
    //     }
    // }

    deleteId = taskList.findIndex(task => task.id == id);

    taskList.splice(deleteId, 1);
    displayTask();
}

function updateTask(taskId, taskName) {
    editId = taskId;
    isEditTask = true;
    txtTaskName.value = taskName;
    txtTaskName.focus();
    txtTaskName.classList.add("active");
    btnAdd.innerHTML = "Update";
}

btnClear.addEventListener("click", (event) => {
    taskList.splice(0, taskList.length);
    displayTask();

    event.preventDefault();
});

function updateStatus(selectedTask) {
    let label = selectedTask.nextElementSibling;
    let status;

    if (selectedTask.checked) {
        label.classList.add("checked");
        status = "completed";
    } else {
        label.classList.remove("checked");
        status = "pending";
    }

    for (task of taskList) {
        if (task.id == selectedTask.id) {
            task.status = status;
        }
    }
}