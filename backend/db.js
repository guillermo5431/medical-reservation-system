const mysql = require('mysql2/promise');
require('dotenv').config(); // To Load environment variables


//Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root', //my MySQL username
    password: process.env.DB_PASSWORD || '1234', //my MySQL password
    database: process.env.DB_NAME || 'medicaldb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//Export the pool for use in other modules
module.exports = pool;