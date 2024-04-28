let tasks = [];
let wallet = 0;

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskReward = parseInt(document.getElementById("taskReward").value);

    if (!taskName || isNaN(taskReward) || taskReward <= 0) {
        alert("Please enter valid task details.");
        return;
    }

    const existingTask = tasks.find(task => task.name === taskName && !task.completed);

    if (existingTask) {
        alert("Task already exists in current tasks!");
    } else {
        const task = {
            name: taskName,
            reward: taskReward,
            completed: false
        };

        tasks.push(task);
        updateTaskList();
    }
}

function updateTaskList() {
    const taskList = document.getElementById("tasks");
    const walletAmount = document.getElementById("walletAmount");
    const completedList = document.getElementById("completedList");

    walletAmount.textContent = wallet;
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        if (!task.completed) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `taskCheckbox${index}`;
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    withdrawMoney(task.reward);
                    task.completed = true;
                    updateTaskList();
                }
            });

            listItem.textContent = `${task.name} - ₹${task.reward}`;
            listItem.appendChild(checkbox);
            taskList.appendChild(listItem);
        } else {
            listItem.textContent = `${task.name} - ₹${task.reward}`;
            listItem.style.textDecoration = "line-through";
            listItem.style.color = "#808080";
            completedList.appendChild(listItem);
        }
    });
}

function withdrawMoney(amount) {
    wallet += amount;
    updateTaskList();
}