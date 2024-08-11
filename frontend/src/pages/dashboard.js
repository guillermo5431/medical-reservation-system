import React from 'react'
import '../styles/LocationCard.css';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
        <div className='location-cards'>
            <img src={image} alt={name} className='location-image' />
            <div className='location-details'>
                <h3 className='location-name'>nameplaceholder</h3>
                <p className='location-address'>addressplaceholder</p>
                <div className='location-actions'>
                    <button className='btn btn book-appointment'>Book Appointment</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Dashboard