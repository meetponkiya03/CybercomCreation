const localStorageKey = "users";
const sessionKey = "currentUser";

function registerUser() {
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!fullName || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('Email already exists. Please choose a different email.');
        return;
    }

    var newUser = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        password: password,
        role: role
    };

    users.push(newUser);
    localStorage.setItem(localStorageKey, JSON.stringify(users));

    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
}

function loginUser(event) {
    event.preventDefault(); 
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!email || !password || !role) {
        alert('Please fill in all fields.');
        return;
    }

    const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const user = users.find(user => user.email === email && user.password === password && user.role === role);
    console.log(user);
    if (!user) {
        alert('Invalid email or password.');
        return;
    }

    sessionStorage.setItem(sessionKey, JSON.stringify(user));

    if (role === 'doctor') {
        window.location.href = 'doctorDashboard.html';
    } else {
        window.location.href = 'patientDashboard.html';
    }
}

function logoutUser() {
    sessionStorage.removeItem(sessionKey);
    window.location.href = 'login.html';
}

