const express = require('express');
const cors = require('cors');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3001;

// Secret key for JWT
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

//Middleware
app.use(cors());
app.use(express.json());

app.post('/partner/login', async (req, res) => {
    const {email, password } = req.body;

    try {
        // Check for the partner in the user table (admin or doctor)
        const [userResult] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);


        if (userResult.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password'});
        }

        const user = userResult[0];

        //Verify the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Determine the role to set userRole accordingly
        const [roleResult] = await pool.query(
            'SELECT role FROM user WHERE id = ?',
            [user.id]
        );
        const role = roleResult[0].role;

        // Create JWT token
        const token = jwt.sign({ id: user.id, role }, jwSecret, { expiresIn: '1h'});
        res.json({ message: 'Login successful', token, userRole: role });
    } catch (err) {
        console.error('Error during partner login', err);
        res.status(500).send('Error during login');
    }
});

// Partner Sign-Up
app.post('/partner/signup', async (req, res) => {
    const {name, email, phone, desiredLocation, specialty, password, role } = req.body;

    // Input validation
    if (!name || !email || !password || !desiredLocation || !role) {
        return res.status(400).json({ message: 'Please provide all required fields.'});
    }

    try {
        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert a new user
        const [userResult] = await pool.query(
            'INSERT INTO user (email, password, phone_number, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, phone, role]
        );
        const user_id = userResult.insertId;

        // Insert into role-specific table 
        if (role === 'admin') {
            await pool.query(
                'INSERT INTO admin (user_id, office_id, name) VALUES (?, ?, ?)',
                [user_id, desiredLocation, name]
            )
        } else if (role === 'doctor') {
            await pool.query(
                'INSERT INTO doctor (user_id, office_id, specialty, name) VALUES (?, ?, ?, ?)',
                [user_id, desiredLocation, name]
            );
        }

        res.status(201).json({ message: 'Partner registered successfully' });
    } catch (err) {
        console.error('Error during partneer sign-up', err);
        res.status(500).json({ error: 'Database error while registering partner' })
    }
});

//Patient Login
app.post('/patient/login', async (req,res) => {
    const { email, password } = req.body;

    try {
        // Check for the patient in the user table
        const [userResult] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

        if (userResult.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password'});
        }

        const user = userResult[0];

        // Verify the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        //Check for the patient role
        const [roleResult] = await pool.query(
            'SELECT role FROM user WHERE id = ?',
            [user.id]
        );
        const role = roleResult[0].role;

        if (role !== 'patient') {
            return res.status(401).json({ message: 'Unauthorized login attempt' });
        }

        // Create JWT token 
        const token = jwt.sign({ id: user.id, role }, jwtSecret, {expiresIn: '1h'});
        res.json({ message: 'Login successful', token, userRole: role});
    } catch (err) {
        console.error('Error during patient login', err);
        res.status(500).send('Error during login');
    }
});

app.post('/patient/signup', async (req, res) => {
    const {name, birthDate, gender, address, phone, email, password} = req.body;

    // Input validation
    if (!name || !birthDate || !gender || !address || !phone || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.'});
    }
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // SQL query to insert a new user
        const [userResult] = await pool.query(
            'INSERT INTO user (email, password, phone_number, role) VALUES (?, ?, ?, ?)', 
            [email, hashedPassword, phone, 'patient']
        );
        const user_id = userResult.insertId;

        // Insert into patient-specific table
        await pool.query(
            'INSERT INTO patient (user_id, name, birth_date, gender, address) VALUES (?, ?, ?, ?, ?)',
            [user_id, name, birthDate, gender, address]
        );

        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (err) {
        console.error('Error during patient sign-up', err);
        res.status(500).json({ error: 'Database error while registering patient'});
    }

});

/*

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
} */


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
