import React, { useState } from 'react'
import '../styles/LoginSignup.css'

import user_icon from '../components/Assets/person.png'
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'
import date_icon from '../components/Assets/date.png'
import gender_icon from '../components/Assets/gender.png'
import address_icon from '../components/Assets/address.png'


const LoginSignup = () => {
    const [action,setAction] = useState("Login");


  return (
    <div className='custom-container'>
    <div className="header">
      <div className="text">{action}</div>
      <div className='underline'></div>
    </div>
    <div className="inputs">
    {action !== "Login" && (
          <>
            <div className="input">
              <img src={user_icon} alt="user icon" />
              <input type="text" placeholder="Name" />
            </div>
            <div className="input">
              <img src={date_icon} alt="date icon" />
              <input type="text" placeholder="Birth Date" />
            </div>
            <div className="input">
              <img src={gender_icon} alt="gender icon" />
              <input type="text" placeholder="Gender" />
            </div>
            <div className="input">
              <img src={address_icon} alt="address icon" />
              <input type="text" placeholder="Address" />
            </div>
          </>
        )}
      <div className="input">
        <img src={email_icon} alt=""/>
        <input type="email" placeholder="Email" />
      </div>
      <div className="input">
        <img src={password_icon} alt=""/>
        <input type="password" placeholder="password"/>
      </div>
    </div>
    {action==="Sign up"?<div></div>: <div className="forgot-password">Lost Password? <span>Click Here</span></div>}
    <div className="submit-container">
      <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign up</div>
      <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
    </div>
  </div>
  )
}

export default LoginSignup