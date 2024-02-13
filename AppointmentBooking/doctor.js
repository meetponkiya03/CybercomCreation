const localStorageKey = "appointments";

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
            <p>Patient: ${appointment.patient}</p>
        `;
        appointmentsContainer.appendChild(appointmentDiv);
    });
}
displayAppointments();
