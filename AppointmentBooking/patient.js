const localStorageKey = "appointments";
function bookAppointment(event) {
    event.preventDefault(); 

    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var doctorName = document.getElementById('txtDoctorname').value.trim();

    if (date === '' || time === '' || doctorName === '') {
        alert('Please fill in all fields.');
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];
    var doctorExists = users.find(function(users) {
        return users.fullName === doctorName && users.role === 'doctor';
    });

    if (!doctorExists) {
        alert('Doctor not found. Please enter a valid doctor name.');
        return;
    }

    var newAppointment = {
        date: date,
        time: time,
        doctor: doctorName
    };

    var appointments = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    appointments.push(newAppointment);

    localStorage.setItem(localStorageKey, JSON.stringify(appointments));

    displayAppointments();
}

function displayAppointments() {
    var appointments = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    var appointmentsContainer = document.querySelector('.appointments');

    appointmentsContainer.innerHTML = '';

    appointments.forEach(function(appointment) {
        var appointmentDiv = document.createElement('div');
        appointmentDiv.classList.add('appointment');
        appointmentDiv.innerHTML = `
            <p>Date: ${appointment.date}</p>
            <p>Time: ${appointment.time}</p>
            <p>Doctor: ${appointment.doctor}</p>
        `;
        appointmentsContainer.appendChild(appointmentDiv);
    });
}

displayAppointments();