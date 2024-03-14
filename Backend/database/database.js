const mysql = require('mysql');
require('dotenv').config()

// Informations de connexion à la base de données
const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

module.exports = { pool: pool };
