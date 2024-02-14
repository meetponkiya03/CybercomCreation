function bookSlot() {
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (!date || !startTime || !endTime) {
        alert('Please fill in all fields.');
        return;
    }

    const doctor = JSON.parse(sessionStorage.getItem('currentUser'));
    const doctorId = doctor.id;
    const doctorName = doctor.fullName;

    if (!doctorId || !doctorName) {
        alert('Doctor information not found.');
        return;
    }

    const slotData = {
        doctorId: doctorId,
        doctorName: doctorName,
        date: date,
        startTime: startTime,
        endTime: endTime
    };

    let slots = JSON.parse(localStorage.getItem('doctorSlots')) || [];
    slots.push(slotData);
    localStorage.setItem('doctorSlots', JSON.stringify(slots));

    alert('Slot booked successfully!');
}

function loadAppointments() {
    const appointmentsContainer = document.getElementById('appointments');
    appointmentsContainer.innerHTML = ''; 

    // Get the current user's data from session storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    // Retrieve appointments from local storage
    const appointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];

    // Filter appointments for the current user's doctor
    const filteredAppointments = appointments.filter(appointment => {
        return appointment.doctorName === currentUser.fullName;
    });

    // Display appointments for the current user's doctor
    filteredAppointments.forEach(appointment => {
        const appointmentElement = document.createElement('div');
        appointmentElement.classList.add('appointment');
        appointmentElement.innerHTML = `
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Patient:</strong> ${appointment.patientName}</p>
        `;
        appointmentsContainer.appendChild(appointmentElement);
    });
}

loadAppointments();