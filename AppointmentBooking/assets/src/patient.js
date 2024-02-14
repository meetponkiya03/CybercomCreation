const localStorageKey = "patientAppointments"
function bookAppointment(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const doctorName = document.getElementById('txtDoctorname').value;

    if (!date || !time || !doctorName) {
        alert('Please fill in all fields.');
        return;
    }

    const doctorSlots = JSON.parse(localStorage.getItem('doctorSlots')) || [];
    const doctorAvailable = doctorSlots.find(doctor => doctor.date === date &&  doctor.doctorName === doctorName && doctor.startTime <= time && doctor.endTime > time);
    if (!doctorAvailable) {
        alert('Doctor is not available at the specified time. Please choose another time.');
        return;
    }

    const patient = JSON.parse(sessionStorage.getItem('currentUser'));
    const patientID = patient.id;
    const patientName = patient.fullName;

    const appointment = {
        patientId:patientID,
        patientName:patientName,
        date: date,
        time: time,
        doctorName: doctorName
    };

    let appointments = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    appointments.push(appointment);
    localStorage.setItem(localStorageKey, JSON.stringify(appointments));

    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('txtDoctorname').value = '';

    alert('Appointment booked successfully!');

    loadAppointments();
}

function loadAppointments() {
    const appointmentsContainer = document.querySelector('.appointments');
    appointmentsContainer.innerHTML = ''; 

    const appointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];

    if (appointments.length === 0) {
        appointmentsContainer.innerHTML = '<p>No appointments scheduled yet.</p>';
        return;
    }

    appointments.forEach(appointment => {
        const appointmentElement = document.createElement('div');
        appointmentElement.classList.add('appointment');
        appointmentElement.innerHTML = `
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
        `;
        appointmentsContainer.appendChild(appointmentElement);
    });
}
loadAppointments();