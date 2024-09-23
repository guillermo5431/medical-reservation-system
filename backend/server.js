// Import required modules
const express = require('express'); // Framework for building web applications
const cors = require('cors'); // Middleware to enable CORS (Cross-Origin Resource Sharing)
const pool = require('./db'); // Database connection pool
const jwt = require('jsonwebtoken'); // JSON Web Token library for authentication
const bcrypt = require('bcrypt'); // Library for hashing passwords
const rateLimit = require('express-rate-limit'); // Middleware to limit repeated requests
const helmet = require('helmet'); // Middleware to secure HTTP headers

const app = express(); // Create an Express application
const port = process.env.PORT || 3001; // Set the port from environment variable or use 3001

// Secret key for JWT (JSON Web Token)
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Add security headers to all responses

// Rate limiter for login routes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 10, // Limit each IP to 10 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
});

// JWT Verification Middleware
const verifyJWT = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Get the Authorization header
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' }); // If no header, deny access
    }

    const token = authHeader.split(' ')[1]; // Split header to get the token

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: Malformed Token' }); // If no token, deny access
    }

    try {
        const verified = jwt.verify(token, jwtSecret); // Verify the token using the JWT secret
        req.user = verified; // Attach the verified user data to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' }); // If verification fails, send error response
    }
};

// Route: Partner login (for admin or doctor)
app.post('/partner/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body; // Extract email and password from the request body

    try {
        // Query the database to find the user with the provided email
        const [userResult] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

        if (userResult.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' }); // If no user found, return error
        }

        const user = userResult[0];

        // Verify the password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' }); // If password doesn't match, return error
        }

        // Generate a JWT token with user id and role
        const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, userRole: user.role }); // Send token and role in the response
    } catch (err) {
        console.error('Error during partner login', err); // Log error if any occurs
        res.status(500).send('Error during login'); // Send server error response
    }
});

// Route: Partner sign-up (for admin or doctor)
app.post('/partner/signup', async (req, res) => {
    const { name, email, phone, desiredLocation, specialty, password, role } = req.body; // Extract required fields from request body

    if (!name || !email || !password || !desiredLocation || !role) {
        return res.status(400).json({ message: 'Please provide all required fields.' }); // Validate required fields
    }

    const connection = await pool.getConnection(); // Get a connection from the pool

    try {
        await connection.beginTransaction(); // Begin a transaction

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the user table
        const [userResult] = await connection.query(
            'INSERT INTO user (email, password, phone_number, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, phone, role]
        );
        const user_id = userResult.insertId;

        // Insert into role-specific table (admin or doctor)
        if (role === 'admin') {
            await connection.query(
                'INSERT INTO admin (user_id, office_id, name) VALUES (?, ?, ?)',
                [user_id, desiredLocation, name]
            );
        } else if (role === 'doctor') {
            await connection.query(
                'INSERT INTO doctor (user_id, office_id, specialty, name) VALUES (?, ?, ?, ?)',
                [user_id, desiredLocation, specialty, name]
            );
        }

        await connection.commit(); // Commit the transaction if successful

        res.status(201).json({ message: 'Partner registered successfully' }); // Send success response
    } catch (err) {
        await connection.rollback(); // Rollback the transaction if any error occurs
        console.error('Error during partner sign-up', err); // Log the error
        res.status(500).json({ error: 'Database error while registering partner' }); // Send error response
    } finally {
        connection.release(); // Release the connection back to the pool
    }
});

// Route: Patient login
app.post('/patient/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Query the database to find the patient with the provided email
        const [userResult] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

        if (userResult.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' }); // If no user found, return error
        }

        const user = userResult[0];

        // Verify the password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' }); // If password doesn't match, return error
        }

        const role = user.role;
        if (role !== 'patient') {
            return res.status(401).json({ message: 'Unauthorized login attempt' }); // Ensure only patients can log in
        }

        // Retrieve patient id by using user id
        const [patientResult] = await pool.query('SELECT patient_id FROM patient WHERE user_id = ?', [user.user_id]);

        if (patientResult.length === 0) {
            return res.status(404).json({ message: 'Patient record not found' }); // If no patient record found, return error
        }

        const patient = patientResult[0];

        // Create JWT token with user id and patient id
        const token = jwt.sign({ id: user.user_id, patient_id: patient.patient_id, role }, jwtSecret, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, userRole: role }); // Send token and role in the response
    } catch (err) {
        console.error('Error during patient login', err); // Log error if any occurs
        res.status(500).send('Error during login'); // Send server error response
    }
});

// Route: Patient sign-up
app.post('/patient/signup', async (req, res) => {
    const { name, birthDate, gender, address, phone, email, password } = req.body; // Extract required fields from request body

    if (!name || !birthDate || !gender || !address || !phone || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' }); // Validate required fields
    }

    const connection = await pool.getConnection(); // Get a connection from the pool
    
    try {
        await connection.beginTransaction(); // Begin a transaction

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the user table
        const [userResult] = await connection.query(
            'INSERT INTO user (email, password, phone_number, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, phone, 'patient']
        );
        const user_id = userResult.insertId;

        // Insert the new patient into the patient-specific table
        await connection.query(
            'INSERT INTO patient (user_id, name, birth_date, gender, address) VALUES (?, ?, ?, ?, ?)',
            [user_id, name, birthDate, gender, address]
        );

        await connection.commit(); // Commit the transaction if successful

        res.status(201).json({ message: 'Patient registered successfully' }); // Send success response
    } catch (err) {
        await connection.rollback(); // Rollback the transaction if any error occurs
        console.error('Error during patient sign-up', err); // Log the error
        res.status(500).json({ error: 'Database error while registering patient' }); // Send error response
    } finally {
        connection.release(); // Release the connection back to the pool
    }
});

// Route: Get user profile (protected route)
app.get('/profile', verifyJWT, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user id from the verified JWT token

        // Query the database to get user details
        const [userResult] = await pool.query('SELECT * FROM user WHERE id = ?', [userId]);

        if (userResult.length === 0) {
            return res.status(404).json({ message: 'User not found' }); // If no user found, return error
        }

        const user = userResult[0];
        res.json(user); // Send user details in the response
    } catch (err) {
        console.error('Error fetching user profile', err); // Log error if any occurs
        res.status(500).send('Error fetching user profile'); // Send server error response
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
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
