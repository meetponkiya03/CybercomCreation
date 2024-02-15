const localStorageKeys = {
    doctor: "doctorAppointments",
    patient: "patientAppointments"
};
function checkLogin(){
    const doctor = JSON.parse(sessionStorage.getItem('currentUser'));
    if(!doctor){
        window.location.href = 'login.html';
    }
}
checkLogin();
function bookSlot() {
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    console.log(typeof endTime);
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
    const appointmentsContainer = document.getElementById("appointments");
    appointmentsContainer.innerHTML = '';

    const doctor = JSON.parse(sessionStorage.getItem("currentUser"));
    const doctorName = doctor.fullName;
    
    const patientAppointments = JSON.parse(localStorage.getItem(localStorageKeys.patient)) || [];

    const doctorAppointments = patientAppointments.filter((appointment) => appointment.doctorName === doctorName);
    console.log(doctorAppointments);
    if (doctorAppointments.length === 0) {
        appointmentsContainer.innerHTML = "<p>No appointments scheduled yet.</p>";
        return;
    }

    doctorAppointments.forEach(appointment => {
        const appointmentElement = document.createElement('div');
        appointmentElement.classList.add('appointment');
        appointmentElement.innerHTML = `
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Patient Name:</strong> ${appointment.patientName}</p>
            <button onclick="acceptAppointment(${appointment.id})">Accept</button>
            <button onclick="rejectAppointment(${appointment.id})">Reject</button>
            <button onclick="rescheduleAppointment(${appointment.id})">Reschedule</button>
        `;
        appointmentsContainer.appendChild(appointmentElement);
    });
}

function acceptAppointment(appointmentId) {
    const patientAppointments = JSON.parse(localStorage.getItem(localStorageKeys.patient)) || [];
    const index = patientAppointments.findIndex(appointment => appointment.id === appointmentId);
    if (index !== -1) {
        patientAppointments[index].status = "Accepted";
        localStorage.setItem(localStorageKeys.patient, JSON.stringify(patientAppointments));
        loadAppointments();
    }
}


function rejectAppointment(appointmentId) {
    const patientAppointments = JSON.parse(localStorage.getItem(localStorageKeys.patient)) || [];
    const index = patientAppointments.findIndex(appointment => appointment.id === appointmentId);

    if (index !== -1) {
        patientAppointments[index].status = "Rejected";
        localStorage.setItem(localStorageKeys.patient, JSON.stringify(patientAppointments));
        loadAppointments();
    }
}

loadAppointments();