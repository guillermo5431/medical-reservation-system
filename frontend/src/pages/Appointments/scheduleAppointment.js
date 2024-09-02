import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/scheduleAppointments.css';
import office_icon from '../../components/Assets/office.png'

const ScheduleAppointment = () => {
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/offices');
        setOffices(response.data);
      } catch (error) {
        console.error('Error fetching offices:', error);
      }
    };

    fetchOffices();
  }, []);

  const handleBookAppointment = async (officeId) => {
    setSelectedOffice(officeId);

    try {
      const response = await axios.get(`http://localhost:3001/doctors?officeId=${officeId}`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleScheduleAppointment = async () => {
    if (selectedDoctor && appointmentDate && appointmentTime) {
      try {
        await axios.post('http://localhost:3001/appointments', {
          office_id: selectedOffice,
          doctor_id: selectedDoctor,
          date: appointmentDate,
          time: appointmentTime,
        });

        alert('Appointment scheduled successfully!');
        
      } catch (error) {
        console.error('Error scheduling appointment:', error);
      }
    } else {
       alert('Please select a doctor, date, and time for the appointment.');
    }
  };

  return (
    <div className='schedule-appointment-container'>
      <h2>Select an Office Location</h2>
      <div className='office-list'>
        {offices.map((office) => (
          <div className='office-card' key={office.office_id}>
            <img src={office_icon} alt="Office Icon" className='office-image' />
            <div className='office-info'>
            <h3 className='office-name'>{office.city}</h3>
            <p className='office-address'>{office.address}, {office.city}, {office.state}</p>
            <p className='office-phone'>{office.phone_number}</p>
          </div>
          <button
            className='book-appointment-button'
            onClick={() => handleBookAppointment(office.office_id)}
          >
            Book Appointment
          </button>
        </div>
        ))}
      </div>

        {selectedOffice && (
          <div className='appointment-details'>
            <h2>Schedule an Appointment</h2>

            <label htmlFor='doctor-select'>Select Doctor:</label>
            <select 
              id='doctor-select'
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value=''>--Select a Doctor--</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                Dr. {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>

            <label htmlFor='date'>Select Date:</label>
            <input 
              type='date'
              id='date'
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />

            <label htmlFor='time'>Select Time:</label>
            <input 
              type='time'
              id='time'
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />

            <button 
              className='schedule-appointment-button'
              onClick={handleScheduleAppointment}
            >
              Schedule Appointment
            </button>
          </div>
        )}
    </div>
  );
};


export default ScheduleAppointment;
