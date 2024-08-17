const express = require('express');
const cors = require('cors');
const pool = require('./db');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

// Secret key for JWT
const jwtSecret = 'your_jwt_secret_key';

//Middleware
app.use(cors());
app.use(express.json());

// Route to get patient data
app.get('/api/patients', authenticateToken, async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM patient');
        res.json(rows); // Send data as JSON
    } catch (err) {
        console.error('Error fetching patients:', err); // Log error for debugging
        res.status(500).send('Error fetching data');
    }
});

app.get('/api/doctors', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM doctor');
        res.json(rows); // Send data as JSON
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).send('Error fetching data');
    }
});

// Add POST routes for login and signup
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        //Query to check user in the database
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

        if (rows.length > 0) {
            res.json({ message: 'Login successful', user: rows[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).send('Error during login');
    }
});

app.post('/signup', async (req, res) => {
    const { name, birthDate, gender, address, phone, email, password } = req.body;

    try {
        // Query to insert new user into the database
        const [result] = await pool.query(
            'INSERT INT0 patient (name, birthDate, gender, address, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [name, birthDate, gender, address, phone, email, password]
        );

        res.json({ message: 'Signup successful', userId: result.insertId });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).send('Error during signup');
    }
});

//Middleware to authenticate token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
