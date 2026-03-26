// Backend/config/db.js

const path = require("path");

// Load .env file from Backend folder
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const mysql = require("mysql2/promise");

/* DEBUG LOGS — to verify .env is loading */
console.log("ENV PATH:", path.resolve(__dirname, "../.env"));
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected to database:", process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
    console.error("→ Check DB_USER, DB_PASSWORD in Backend/.env");
  }
})();

module.exports = pool;