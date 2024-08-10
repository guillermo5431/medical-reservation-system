import React from 'react'
//import '../styles/LoginSignup.css'

import user_icon from '../components/Assets/person.png'
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'

function signup() {
  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign up</div>
        <div className='underline'></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt=""/>
          <input type="text" />
        </div>
        <div className="input">
          <img src={email_icon} alt=""/>
          <input type="email" />
        </div>
        <div className="input">
          <img src={password_icon} alt=""/>
          <input type="password" />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">Sign up</div>
      </div>
    </div>
  )
}

export default signup