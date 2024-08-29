import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/adminDashboard.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    // Fetch appointments, doctors, and offices when the component loads
    const fetchData = async () => {
      try {
        const appointmentsRes = await axios.get('/appointments');
        const doctorsRes = await axios.get('/doctors');
        const officesRes = await axios.get('/offices');

        setAppointments(appointmentsRes.data);
        setDoctors(doctorsRes.data);
        setOffices(officesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

return (
  <div className='admin-dashboard'>
    <h1>Admin Dashboard</h1>

    <section className='appointments-section'>
      <h2>Manage Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.appointment_id}>
            {appointment.date} - {appointment.slotted_time} with Doctor ID: {appointment.doctor_id}
          </li>
        ))}
      </ul>
    </section>

    <section className='doctors-section'>
      <h2>Manage Doctors</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.doctor_id}>
            Dr. {doctor.name} - Specialty: {doctor.specialty} - Office: {doctor.office_id}
          </li>
        ))}
      </ul>
    </section>

    <section className='offices-section'>
      <h2>Manage Offices</h2>
      <ul>
        {offices.map(office => (
          <li key={office.office_id}>
            {office.address}, {office.city}, {office.state}
          </li>
        ))}
      </ul>
    </section>
  </div>
);

};

export default admindashboard
