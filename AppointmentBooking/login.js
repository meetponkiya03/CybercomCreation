const localStorage_key = "users";

function loginUser() {
  var email = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;
  var role = document.getElementById("role").value;

  if (email === "" || password === "" || role==="") {
    alert("Please fill in all fields.");
    return;
  }

  var users = JSON.parse(localStorage.getItem(localStorage_key)) || [];

  var user = users.find(function (user) {
    return user.email === email;
  });

  if (!user) {
    alert("User not found. Please check your email and try again.");
    return;
  }

  if (user.password !== password) {
    alert("Incorrect password. Please try again.");
    return;
  }

  if (user.role !== role) {
    alert("Please select Proper role");
    return;
  }

  //alert("Login successful! Welcome ");

  if (user.role === "doctor") {
    window.location.href = "doctorDashboard.html";
  } else {
    window.location.href = "http://127.0.0.1:5500/patientDashboard.html";
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });