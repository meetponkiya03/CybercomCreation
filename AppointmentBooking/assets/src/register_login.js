const localStorageKey = "users";
const sessionKey = "currentUser";

function displayError(fieldId, errorMessage) {
    const errorSpan = document.querySelector(`#${fieldId} + .error`);
    errorSpan.textContent = errorMessage;
}

function clearError(fieldId) {
    const errorSpan = document.querySelector(`#${fieldId} + .error`);
    errorSpan.textContent = '';
}

function validateFullName() {
    const fullName = document.getElementById('fullname').value.trim();
    if (!fullName) {
        displayError('fullname', 'Please enter your full name.');
        return false;
    } else {
        clearError('fullname');
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        displayError('email', 'Please enter your email address.');
        return false;
    } else if (!emailRegex.test(email)) {
        displayError('email', 'Please enter a valid email address.');
        return false;
    } else {
        clearError('email');
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value.trim();
    if (!password) {
        displayError('password', 'Please enter your password.');
        return false;
    } else {
        clearError('password');
        return true;
    }
}

function validateRole() {
    const role = document.getElementById('role').value;
    if (!role) {
        displayError('role', 'Please select your role.');
        return false;
    } else {
        clearError('role');
        return true;
    }
}

function registerUser(event) {
    event.preventDefault();
    validateFullName();
    validateEmail();
    validatePassword();
    validateRole();
    if (!validateFullName() || !validateEmail() || !validatePassword() || !validateRole()) {
        return;
    }

    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        displayError('email', 'Email already exists. Please choose a different email.');
        return;
    }

    const newUser = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        password: password,
        role: role
    };

    users.push(newUser);
    localStorage.setItem(localStorageKey, JSON.stringify(users));

    alert('Registration successful! Please log in.');
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    validateEmail();
    validatePassword();
    validateRole();
    if (!validateEmail() || !validatePassword() || !validateRole()) {
        return;
    }

    const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const user = users.find(user => user.email === email && user.password === password && user.role === role);

    if (!user) {
        document.getElementById('error').innerHTML='invalid username or password'
        return;
    }

    sessionStorage.setItem(sessionKey, JSON.stringify(user));

    if (role === 'doctor') {
        window.location.href = 'doctorDashboard.html';
    } else {
        window.location.href = 'patientDashboard.html';
    }
}