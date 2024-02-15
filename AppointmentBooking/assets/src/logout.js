function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}