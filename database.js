const mysql = require('mysql2');

// Create the connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tushar',           
    password: 'password',  
    database: 'myntra'     
});

// Connect to the database
db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;
