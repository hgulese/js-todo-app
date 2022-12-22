let ul = document.getElementById("task-list");
let btnAdd = document.querySelector("#btnAddNewTask");
let btnRemove = document.querySelector("#btnRemoveTask")
let txtTaskName = document.querySelector("#txtTaskName");

let taskList = [
    { "id": 1, "taskName": "Task 1" },
    { "id": 2, "taskName": "Task 2" },
    { "id": 3, "taskName": "Task 3" },
    { "id": 4, "taskName": "Task 4" },
];

displayTask();

function displayTask() {
    ul.innerHTML = "";

    for (let task of taskList) {
        let li = `
            <li class="task list-group-item">
                <div class="form-check">
                    <input type="checkbox" id="${task.id}" class="form-check-input">
                    <label for="${task.id}" class="form-check-label">${task.taskName}</label>
                </div>
            </li>
        `;


        ul.insertAdjacentHTML("beforeend", li);
    }
}

btnAdd.addEventListener("click", (event) => {

    if (txtTaskName.value != "") {
        taskList.push({ "id": taskList.length + 1, "taskName": txtTaskName.value });
        displayTask();

        txtTaskName.value = "";
    } else {
        alert("Please! Enter a task name.")
    }

    event.preventDefault();
});