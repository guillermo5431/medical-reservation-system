import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PartnersLoginSignup.css'

import user_icon from '../components/Assets/person.png'
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'
import address_icon from '../components/Assets/address.png'
import phone_icon from '../components/Assets/phone.png'
import specialty_icon from '../components/Assets/specialty.png'


const PartnersLoginSignup = () => {
    const [action,setAction] = useState("Login");
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      desiredLocation: '',
      speciality: '',
      password: '',
      role: 'admin', // Default role
    });

    const [offices, setOffices] = useState([]);

    useEffect(() => {
      const fetchOffices = async () => {
        try {
            const response = await axios.get('http//localhost:3001/offices');
            setOffices(response.data);
        } catch (error) {
            console.error('Error fetchin offices:', error);
        }
      };

      fetchOffices();
    }, []);



    const navigate = useNavigate(); //Initialize the useNavigate hook

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setFormData({ ...formData, [name]: value});
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const validatePassword = (password) => {
      return password.length >= 6;
    }

    const handleSubmit = async () => {
      const { name, email, phone, desiredLocation, specialty, password, role} = formData;

      if (action === "Sign Up" && (!name || !email || !phone || !password || (role === 'doctor' && !specialty) || !desiredLocation)) {
        alert("Please fill in all fields")
        return;
      }

      if (action === "Login" && (!email || !password)) {
        alert("Please fill in all fields.")
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long.");
        return;
      }

      const payload = { email, password };
      
      if (action === "Sign Up") {
        payload.name = name;
        payload.phone = phone;
        payload.desiredLocation = desiredLocation;
        payload.role = role;
        if (role === 'doctor') {
          payload.specialty = specialty;
        }
      }

      try {
        const endpoint = `http://localhost:3001/partner/${action.toLowerCase().replace(' ','')}`;
        const response = await axios.post(endpoint, payload);

        alert(`${action} successful!`);

        //Redirect to the dashboard after succesful login
        if (action === "Login") {
          const token = response.data.token; // server return the token in this field
          localStorage.setItem('authToken', token); //Store the token in localStorage
          localStorage.setItem('userRole', response.data.userRole || 'guest'); //Store user role if available
          navigate('/dashboard');
          window.location.reload();
        }

      } catch (error) {
        console.error("There was an error with the request:", error);
        alert("There was an issue with the submission. Please try again.");
      }

    };

  return (
    <div className='custom-container'>
    <div className="header">
      <div className="text">{`Partner ${action}`}</div>
      <div className='underline'></div>
    </div>
    <div className="inputs">
      {action !== "Login" && (
          <>
            <div className="input">
              <img src={user_icon} alt="user icon" />
              <input 
                type="text"
                name='name'
                placeholder="Name"
                value = {formData.name}
                onChange={handleInputChange}
                />
            </div>
            <div className="input">
              <img src={phone_icon} alt="phone icon" />
              <input 
                type="text" 
                name='phone'
                placeholder="Phone"
                value = {formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="input">
              <select
                type="text" 
                name='desiredLocation'
                value = {formData.desiredLocation}
                onChange={handleInputChange}
              >
                <option value="">Select Location</option>
                {offices.map (office => (
                  <option key={office.office_id} value={office.office_id}>
                    {office.address}
                  </option>
                ))}
              </select>
            </div>
            {formData.role === 'doctor' && (
            <div className="input">
              <img src={specialty_icon} alt="specialty icon" />
              <input 
                type="text" 
                name='specialty'
                placeholder="Specialty"
                value = {formData.specialty}
                onChange={handleInputChange}
                />
            </div>
            )}
            <div className="input">
                <label>Role:</label>
                <select 
                    name='role'
                    value={formData.role}
                    onChange={handleInputChange}
                >
                    <option value='admin'>Admin</option>
                    <option value='doctor'>Doctor</option>
                </select>
            </div>
          </>
        )}
      <div className="input">
        <img src={email_icon} alt=""/>
        <input 
          type="email" 
          name='email'
          placeholder="Email" 
          value = {formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="input">
        <img src={password_icon} alt=""/>
        <input 
          type="password" 
          name='password'
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          />
      </div>
    </div>
    {action==="Sign up"?<div></div>: <div className="forgot-password">Lost Password? <span>Click Here</span></div>}
    <div className="toggle-container">
      <div 
        className={action==="Login"?"toggle gray":"toggle"}
        onClick={()=>{setAction("Sign Up")}}
      >
        Sign up
      </div>
      <div 
        className={action==="Sign Up"?"toggle gray":"toggle"}
        onClick={()=>{setAction("Login")}}
      >
        Login
      </div>
    </div>
    <div className='submit-container'>
      <button 
        className='submit green'
        onClick={handleSubmit}
      >
       Submit
      </button>
    </div>

  </div>
  )
}

export default PartnersLoginSignup