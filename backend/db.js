const mysql = require('mysql2');
require('dotenv').config(); // To handle environment variables


//Create a connection pool
const pool = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB-USER || 'root', //my MySQL username
    password: process.env.DB_PASSWORD || '1234', //my MySQL password
    database: process.env.DB_NAME || 'medicaldb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//Export the pool for use in other modules
module.exports = pool.promise();