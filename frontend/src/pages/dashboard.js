import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/LocationCard.css';
import '../styles/dashboard.css';
import office_icon from '../components/Assets/office.png'

const Dashboard = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/finalizeAppointment'); // redirect to finalize appointment
  }

  return (
    <div className="dashboard">
        <div className='location-card'>
            <img src={office_icon} alt='office_icon' className='location-image' />
            <div className='location-card-info'>
                <h3 className='location-name'>nameplaceholder</h3>
                <p className='location-address'>addressplaceholder</p>
                <p className='location-phone-number'>locationPhoneNumber</p>
            </div>
            <button
             className='location-card-button'
             onClick={handleButtonClick}>
              Book Appointment
            </button>
        </div>

    </div>
  )
}

export default Dashboard