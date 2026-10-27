
let tasks = JSON.parse(localStorage.getItem("campusTasks")) || [];

function saveTasks() {
    localStorage.setItem("campusTasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const listItem = document.createElement("li");
        const taskLabel = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskLabel.textContent = task.text;

        if (task.completed) {
            taskLabel.style.textDecoration = "line-through";
        }

        completeButton.textContent = task.completed ? "Undo" : "Complete";
        deleteButton.textContent = "Delete";

        completeButton.style.marginLeft = "10px";
        deleteButton.style.marginLeft = "6px";

        completeButton.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        deleteButton.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        listItem.appendChild(taskLabel);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a study task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    input.value = "";
    input.focus();
}

displayTasks();

let studySessions = JSON.parse(localStorage.getItem("studySessions")) || [];

function saveStudySessions() {
    localStorage.setItem("studySessions", JSON.stringify(studySessions));
}

function displayTimetable() {
    const list = document.getElementById("timetableList");
    if (!list) return;

    list.innerHTML = "";

    studySessions.forEach(function(session, index) {
        const item = document.createElement("li");
        item.textContent =
            session.day + " | " + session.subject + " | " +
            session.start + " - " + session.end + " ";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            studySessions.splice(index, 1);
            saveStudySessions();
            displayTimetable();
        };

        item.appendChild(deleteButton);
        list.appendChild(item);
    });
}

function addStudySession() {
    const subject = document.getElementById("subjectInput").value.trim();
    const day = document.getElementById("dayInput").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    if (!subject || !day || !start || !end) {
        alert("Please fill in all timetable fields!");
        return;
    }

    if (end <= start) {
        alert("End time must be later than start time!");
        return;
    }

    studySessions.push({
        subject: subject,
        day: day,
        start: start,
        end: end
    });

    saveStudySessions();
    displayTimetable();

    document.getElementById("subjectInput").value = "";
    document.getElementById("dayInput").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
}

displayTimetable();

