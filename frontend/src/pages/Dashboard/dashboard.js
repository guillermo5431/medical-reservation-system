import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/LocationCard.css';
import '../../styles/dashboard.css';
import office_icon from '../../components/Assets/office.png'

const Dashboard = () => {
  const [offices, setOffices] = useState([]);
  const navigate = useNavigate();

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

  const handleButtonClick = () => {
    navigate('/finalizeAppointment'); // redirect to finalize appointment
  }

  return (
    <div className="dashboard">
      {offices.map((office) => (
        <div className='location-card' key={office.office_id}>
            <img src={office_icon} alt='office_icon' className='location-image' />
            <div className='location-card-info'>
                <h3 className='location-name'>{office.city}</h3>
                <p className='location-address'>{office.address}, {office.city}, {office.state}</p>
                <p className='location-phone-number'>{office.phone_number}</p>
            </div>
            <button
             className='location-card-button'
             onClick={handleButtonClick}>
              Book Appointment
            </button>
        </div>
      ))}
    </div>
  )
}

export default Dashboard