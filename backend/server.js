const express = require('express');
const cors = require('cors');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit'); // Rate limiting middleware
const helmet = require('helmet'); // Security middleware

const app = express();
const port = process.env.PORT || 3001;

// Secret key for JWT
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

//Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // adds security headers to all responses

// Rate limiter for login routes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
});

// JWT Verification Middleware
const verifyJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    // Check if the Authorization is present
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });       
    }

    // Split the Authorization header to get the token part
    const token = authHeader.split(' ')[1];

    // Check if the token is present after the split
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: Malformed Token' });       
    }

    try {
        // Verify the token using the JWT secret
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }

}

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

        // Create JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h'});
        res.json({ message: 'Login successful', token, userRole: user.role });
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

    // Start a transaction
    const connection = await pool.getConnection(); 

    try {
        await connection.beginTransaction(); // Begin the transaction

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert a new user
        const [userResult] = await connection.query(
            'INSERT INTO user (email, password, phone_number, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, phone, role]
        );
        const user_id = userResult.insertId;

        // Insert into role-specific table 
        if (role === 'admin') {
            await connection.query(
                'INSERT INTO admin (user_id, office_id, name) VALUES (?, ?, ?)',
                [user_id, desiredLocation, name]
            )
        } else if (role === 'doctor') {
            await connection.query(
                'INSERT INTO doctor (user_id, office_id, specialty, name) VALUES (?, ?, ?, ?)',
                [user_id, desiredLocation, specialty, name]
            );
        }

        await connection.commit(); // Commit the transaction if everything is successful

        res.status(201).json({ message: 'Partner registered successfully' });
    } catch (err) {
        await connection.rollback(); // Rollback the transaction in case of any error
        console.error('Error during partneer sign-up', err);
        res.status(500).json({ error: 'Database error while registering partner' })
    } finally {
        connection.release(); // 
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


        // Directly access the role
        const role = user.role;
        if (role !== 'patient') {
            return res.status(401).json({ message: 'Unauthorized login attempt' });
        }

        // Retrieve patient id by using user id
        const [patientResult] = await pool.query('SELECT patient_id FROM patient WHERE user_id = ?', [user.user_id]);

        if (patientResult.length === 0) {
            return res.status(404).json({ message: 'Patient record not found'});
        }

        const patient = patientResult[0];

        // Create JWT token 
        const token = jwt.sign({ id: user.user_id, patient_id: patient.patient_id, role }, jwtSecret, {expiresIn: '1h'});
        
        res.json({ message: 'Login successful', token, userRole: role});
    } catch (err) {
        console.error('Error during patient login', err);
        res.status(500).send('Error during login');
    }
});

// Patient signup
app.post('/patient/signup', async (req, res) => {
    const {name, birthDate, gender, address, phone, email, password} = req.body;

    // Input validation
    if (!name || !birthDate || !gender || !address || !phone || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.'});
    }

    // Start a transaction
    const connection = await pool.getConnection(); // Get a connection from the pool
    
    try {
        await connection.beginTransaction(); // Begin the transaction
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // SQL query to insert a new user
        const [userResult] = await connection.query(
            'INSERT INTO user (email, password, phone_number, role) VALUES (?, ?, ?, ?)', 
            [email, hashedPassword, phone, 'patient']
        );
        const user_id = userResult.insertId;

        // Insert into patient-specific table
        await connection.query(
            'INSERT INTO patient (user_id, name, birth_date, gender, address) VALUES (?, ?, ?, ?, ?)',
            [user_id, name, birthDate, gender, address]
        );

        await connection.commit(); // Commit the transaction if everything is successful

        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (err) {
        await connection.rollback(); // Rollback the transaction in case of any error
        console.error('Error during patient sign-up', err);
        res.status(500).json({ error: 'Database error while registering patient'});
    } finally {
        connection.release(); // Release the connection back to the pool
    }

});

// fetching office data
app.get('/offices', async (req, res) => {

    try {
        const [offices] = await pool.query('SELECT office_id, address, city, state from office');
        res.json(offices);
    } catch (err) {
        console.error('Error fetching offices:', err);
        res.status(500).json({ message: 'Error fetching offices' });
    }
});

// fetching appointment data
app.get('/appointments', verifyJWT, async (req, res) => {
    try {
        const [appointments] = await pool.query('SELECT * FROM appointment');
        res.json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});

app.get('/doctors', verifyJWT, async (req, res) => {
    const { officeId } = req.query;

    try {
        if (officeId){
            const [doctors] = await pool.query('SELECT * FROM doctor');
            res.json(doctors);
        } else {
            res.status(400). json({ message: 'Office ID is required' });
        }
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

// Scheduling appointment
app.post('/appointments', verifyJWT, async (req, res) => {
    console.log(req.user); // Check what's in req.user
    const { patient_id } = req.user; // Extract patient_id from the JWT`
    
    const {  office_id, doctor_id, date , slotted_time, specialist_type } = req.body;

    try {
        // Validate required fields
        if ( !office_id || !doctor_id || !date || !slotted_time) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }
        
        // Convert date and time to the proper format if necessary 
        const appointmentDate = new Date(date);
        const appointmentTime = new Date(`1970-01-01T${slotted_time}Z`);

        // Default appointment_status_id to 'scheduled' (id=1)
        const appointment_status_id = 1; // Assuming 'scheduled' has id = 1
        
        // Insert the appointment into the database
        const [result] = await pool.query(
            'INSERT INTO appointment (patient_id, doctor_id, office_id, appointment_status_id, date, slotted_time, specialist_type) VALUE (?, ?, ?, ?, ?, ?, ?)',
            [patient_id, doctor_id, office_id, appointment_status_id, appointmentDate, appointmentTime.toTimeString().split(' ')[0], specialist_type]
        );

        res.status(201).json({ message: 'Appointment scheduled successfully', appointmentId: result.insertId });
    } catch (err) {
        console.error('Error scheduling appointment:', err);
        res.status(500).json({ message: 'Error scheduling appointment' });
    }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


