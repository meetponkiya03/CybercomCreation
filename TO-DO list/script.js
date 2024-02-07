const localStorage_KEY = "todoTask";

const bindTableData = () => {
    let localData = localStorage.getItem(localStorage_KEY);
    let tableData = localData ? JSON.parse(localData) : [];

    if (tableData.length > 0) {
        let tableRows = `<tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due-Date</th>
            <th>Priority</th>
            <th>Actions</th>
        </tr>`;
        tableData.forEach((element) => {
            tableRows += `<tr>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td>${element.dueDate}</td>
                <td>${element.priority}</td>
                <td>
                    <button onclick="editTask(${element.id})">Edit</button>
                    <button onclick="deleteTask(${element.id})">Delete</button>
                </td>
            </tr>`;
        });
        document.getElementById("taskTable").innerHTML = tableRows;
    } else {
        document.getElementsByTagName("table")[0] = "";
    }
};

bindTableData();

const addTask = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    let localData = localStorage.getItem(localStorage_KEY);
    let tableData = localData ? JSON.parse(localData) : [];

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
    };
    tableData.push(newTask);
    localStorage.setItem(localStorage_KEY, JSON.stringify(tableData));
    bindTableData();
};

const deleteTask = (taskId) => {
    let localData = localStorage.getItem(localStorage_KEY);
    let tableData = localData ? JSON.parse(localData) : [];

    const filteredTasks = tableData.filter(task => task.id !== taskId);

    localStorage.setItem(localStorage_KEY, JSON.stringify(filteredTasks));

    bindTableData();
};

