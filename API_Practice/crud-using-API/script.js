const employeeList = document.querySelector(".employeeList");
const addEmployeeForm = document.querySelector(".addEmployeeForm");
const txtName = document.getElementById("txtName");
const txtJob = document.getElementById("txtJob");
const txtEducation = document.getElementById("txtEducation");
const url = "https://65d34aea522627d501088926.mockapi.io/employees/employee";
let output = "";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    renderEmployee(data);
  });

const renderEmployee = (data) => {
  data.forEach((employee) => {
    //console.log(employee)
    output += ` <div class="card col-md-2 mt-4" id="employee-${employee.id}">
        <div class="card-body">
          <img class="card-img-top" src="${employee.Image}" alt="Card image cap">
          <h5 class="card-title">Name : ${employee.name}</h5>
          <h5 class="card-title">Job : ${employee.Job}</h5>
          <h5 class="card-title">Education : ${employee.Education}</h5>
          <a href="#" class="card-link" id="editEmp" onclick="editEmployee(${employee.id})">Edit</a>
          <a href="#" class="card-link" id="deleteEmp" onclick="deleteEmployee(${employee.id})">Delete</a>
        </div>
      </div>`;
  });
  employeeList.innerHTML = output;
};

const addEmployee = (event) => {
  event.preventDefault();
  //console.log(txtName.value);
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: txtName.value,
      Job: txtJob.value,
      Education: txtEducation.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      const dataArr = [];
      dataArr.push(data);
      renderEmployee(dataArr);
    });
  alert("data Added Sucessfully!!!");
};
addEmployeeForm.addEventListener("submit", addEmployee);

const deleteEmployee = (employeeId) => {
  const deleteUrl = `${url}/${employeeId}`;
  fetch(deleteUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      const employeeCard = document.getElementById(`employee-${employeeId}`);
      if (employeeCard) {
        employeeCard.remove();
      }
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);
    });
  alert("data delete Sucessfully!!!");
};

const editEmployee = (employeeId) => {
  const editUrl = `${url}/${employeeId}`;
  fetch(editUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      txtName.value = data.name;
      txtJob.value = data.Job;
      txtEducation.value = data.Education;
    });
  addEmployeeForm.removeEventListener("submit", addEmployee);
  addEmployeeForm.addEventListener("submit", (event) => {
      event.preventDefault(); 
      fetch(editUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: txtName.value,
          Job: txtJob.value,
          Education: txtEducation.value,
        }),
      });
    })
    .then((data) => {
      renderEmployee(data);
    });
};