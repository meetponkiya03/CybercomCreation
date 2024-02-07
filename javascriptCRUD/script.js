function storeData() {
  productData = {};
  productData["name"] = document.getElementById("txtTitle").value;
  productData["price"] = document.getElementById("numPrice").value;
  productData["description"] = document.getElementById("description").value;
  productData["category"] = document.getElementById("ddCategory").value;

  //Convert the object to a JSON string
  formDataJSON = JSON.stringify(productData);

  //generate unique key
  key = new Date().getTime().toString();

  //store data into local storage
  localStorage.setItem(key, formDataJSON);
  alert("Entry added successfully.");
}

function displayData() {
  var dataTableBody = document.getElementById('dataTableBody');
  dataTableBody.innerHTML = ''; 
  // Retrieve all entries from local storage
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var storedFormDataJSON = localStorage.getItem(key);
    var storedFormData = JSON.parse(storedFormDataJSON);

    // Create a table row and cells
    var tableRow = document.createElement("tr");
    var nameCell = document.createElement("td");
    var priceCell = document.createElement("td");
    var descriptionCell = document.createElement("td");
    var categoryCell = document.createElement("td");
    var actionCell = document.createElement("td");

    // Set the text content of cells with retrieved data
    nameCell.textContent = storedFormData.name;
    priceCell.textContent = storedFormData.price;
    descriptionCell.textContent = storedFormData.description;
    categoryCell.textContent = storedFormData.category;

    // Create buttons for edit and delete actions
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      var storedValue = JSON.parse(localStorage.getItem(key));

      if (storedValue !== null && typeof storedValue === 'object') {
        // Set the value to the element with ID "txtTitle"
        console.log(document.getElementById("productForm"));
        // document.getElementById("numPrice").value = storedValue.price;
        // document.getElementById("description").value = storedValue.description;
        // document.getElementById("ddCategory").value = storedValue.category;
        // Redirect to the "AddEdit.html" page
        // window.location.href = 'AddEdit.html';
     } else {
        console.error("Key not found in local storage.");
     }  
    };

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      // Implement delete functionality
      localStorage.removeItem(key);
      displayData(); // Refresh the table after deletion
    };

    // // Append buttons to the action cell
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    // Append cells to the row
    tableRow.appendChild(nameCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(descriptionCell);
    tableRow.appendChild(categoryCell);
    tableRow.appendChild(actionCell);

    dataTableBody.appendChild(tableRow);
  }
}
displayData();

