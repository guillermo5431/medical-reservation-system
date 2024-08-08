import React, {useEffect, useState } from 'react';
import axios from 'axios';



function Doctor() {
  const [doctors, setDoctors] = useState  ([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/doctors') //This will be proxied to http://localhost:3001/api/doctors
    .then(response => {
      setDoctors(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
 
  return (
    <div>
      <h1>Doctors</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Office ID</th>
            <th>Speciality</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.doctor_id}>
              <td>{doctor.doctor_id}</td>
              <td>{doctor.office_id}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.name}</td>
              <td>{doctor.phone_number}</td>
              <td>{doctor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Doctor