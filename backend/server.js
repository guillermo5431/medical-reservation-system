const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

//Middleware
app.use(cors());
app.use(express.json());

// Route to get patient data
app.get('/api/patients', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM patinet');
        res.json(rows); // Send data as JSON
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

app.get('/api/doctors', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM doctor');
        res.json(rows); // Send data as JSON
    } catch (err) {
        res.status(500).send('Error fetching data');
    }

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
