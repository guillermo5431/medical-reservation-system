const express = require('express');
const cors = require('cors');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const app = express();
const port = process.env.PORT || 3001;

// Secret key for JWT
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

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
        const [rows] = await pool.query('SELECT * FROM patient WHERE email = ? AND password = ?', [email, password]);

        if (rows.length > 0) {
            //Creates a JWT token upon success
            const token = jwt.sign({ id: rows[0].id, role: 'patient'}, jwtSecret, {expiresIn: '1h'});
            res.json({ message: 'Login successful', token, userRole: 'patient' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).send('Error during login');
    }
});

app.post('/signup', async (req, res) => {
    const { username, password, email, phone_number, role, name, address, office_id, speciality, primary_physician_id, birth_date } = req.body;

    // Input validation 
    if(!username || !password || !email || !role || !name) {
        return res.status(400).json({ message: 'Please provide all required fields.'});
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert a new user 
        const [userResult] = await pool.query (
            'Insert INTO user (username, password, email, phone_number, role) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, email, phone_number, role]
        );
        const user_id = userResult.insertId;


        //Insert into role-specific table
        if (role === 'admin') {
            await pool.query(
                `INSERT INTO admin (user_id, office_id, name) VALUES (?, ?, ?)`,
                [user_id, office_id, name]
            );
        } else if (role === 'doctor') {
            await pool.query(
                `INSERT INTO doctor (user_id, office_id, speciality, name) VALUES (?, ?, ?, ?)`,
                [user_id, office_id, speciality, name]
            );
        } else if (role === 'patient') {
            await pool.query(
                `INSERT INTO patient (user_id, primary_physician_id, name, birth_date) VALUES (?, ?, ?, ?)`,
                [user_id, primary_physician_id, name, birth_date]
            );
        }

        res.status(201).json({ message: "User registered successfully"});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Database error while registering user "});
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
