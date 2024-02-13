const localStorage_key = "users"
function registerUser() {
    var fullName = document.getElementById('fullname').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value;

    if (fullName === '' || email === '' || password === '' || role === '') {
        alert('Please fill in all fields.');
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    var users = JSON.parse(localStorage.getItem(localStorage_key)) || [];
    var existingUser = users.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        alert('User already exists with this email address.');
        return;
    }

    var newUser = {
        fullName: fullName,
        email: email,
        password: password,
        role: role
    };

    users.push(newUser);

    localStorage.setItem(localStorage_key, JSON.stringify(users));

    alert('Registration successful! You can now log in.');
}