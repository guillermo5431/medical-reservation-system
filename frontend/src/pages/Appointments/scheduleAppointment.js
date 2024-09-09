// Import necessary modules and components from React and other libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import '../../styles/scheduleAppointments.css'; // Importing CSS for styling
import office_icon from '../../components/Assets/office.png'; // Importing an image asset

// Functional component to schedule an appointment
const ScheduleAppointment = () => {
  // Define state variables
  const [offices, setOffices] = useState([]); // List of office locations
  const [selectedOffice, setSelectedOffice] = useState(null); // Currently selected office ID
  const [doctors, setDoctors] = useState([]); // List of doctors for the selected office
  const [selectedDoctor, setSelectedDoctor] = useState(''); // Selected doctor ID
  const [appointmentDate, setAppointmentDate] = useState(''); // Appointment date
  const [appointmentTime, setAppointmentTime] = useState(''); // Appointment time
  const [loading, setLoading] = useState(false); // Loading state to indicate data fetching
  const [error, setError] = useState(null); // Error message state

  // Retrieve the authentication token from local storage
  const authToken = localStorage.getItem('authToken');

  // Fetch office locations when the component is first rendered
  useEffect(() => {
    const fetchOffices = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:3001/offices', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the auth token in the request headers
          },
        });
        setOffices(response.data); // Update the state with the fetched office data
      } catch (error) {
        console.error('Error scheduling appointment:', error.response ? error.response.data : error.message);
        setError('Error scheduling appointment. Please try again later.'); // Set error message if request fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOffices();
  }, [authToken]); // Dependency array includes authToken to re-run if it changes

  // Handle the selection of an office and fetch doctors for that office
  const handleBookAppointment = async (officeId) => {
    if (selectedDoctor && appointmentDate && appointmentTime) {
      // Validation: Ensure the selected appointment date is not in the past
      if (new Date(appointmentDate) < new Date()) {
        alert('The appointment date cannot be in the past.');
        return;
      }
    }
    
    setSelectedOffice(officeId); // Set the selected office ID

    setLoading(true); // Start loading
    try {
      const response = await axios.get(`http://localhost:3001/doctors?officeId=${officeId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the auth token in the request headers
        },
      });
      setDoctors(response.data); // Update the state with the fetched doctor data
    } catch (error) {
      setError('Error fetching doctors. Please try again later.'); // Set error message if request fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle the scheduling of an appointment
  const handleScheduleAppointment = async () => {
    // Check that all required fields are selected
    if (selectedDoctor && appointmentDate && appointmentTime) {
      setLoading(true); // Start loading
      try {
        // Send a POST request to schedule the appointment
        await axios.post(
          'http://localhost:3001/appointments',
          {
            office_id: selectedOffice,
            doctor_id: selectedDoctor,
            date: appointmentDate,
            slotted_time: appointmentTime,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Include the auth token in the request headers
            },
          }
        );

        alert('Appointment scheduled successfully!'); // Notify user of success
        
      } catch (error) {
        setError('Error scheduling appointment. Please try again later.'); // Set error message if request fails
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      // Alert user to fill in all required fields
      alert('Please select a doctor, date, and time for the appointment.');
    }
  };

  // Render the component UI
  return (
    <div className='schedule-appointment-container'>
      {loading && <p>Loading...</p>} {/* Show loading text if data is being fetched */}
      {error && <p className='error-message'>{error}</p>} {/* Show error message if there's an error */}

      <h2>Select an Office Location</h2>
      <div className='office-list'>
        {offices.map((office) => (
          <div className='office-card' key={office.office_id}>
            <img src={office_icon} alt="Office Icon" className='office-image' /> {/* Display office icon */}
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

      {/* Render appointment details section if an office is selected */}
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
