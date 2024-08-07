import React, { useEffect, useState } from 'react';
import axios from 'axios';

function patient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/patients') // This will be proxied to http://localhost:3001/api/patients
      .then(response => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Patients</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Primary Physician ID</th>
            <th>Specialist Approved</th>
            <th>Specialist Check</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.patient_id}>
              <td>{patient.patient_id}</td>
              <td>{patient.primary_physician_id}</td>
              <td>{patient.specialist_approved ? 'Yes' : 'No'}</td>
              <td>{patient.specialist_check}</td>
              <td>{patient.name}</td>
              <td>{patient.phone_number}</td>
              <td>{patient.email}</td>
              <td>{patient.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default patient