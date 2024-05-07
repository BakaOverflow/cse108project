// Import required libraries
const express = require('express');
require('dotenv').config(); // Load environment variables early
const sequelize = require('./config/connection'); // Adjust as needed for your DB
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig'); // Make sure to configure Passport strategies here
const userRoutes = require('./routes/userRoutes'); // Ensure this file exists and is set up

const app = express();
const PORT = process.env.PORT || 3000;

// Initalize SQLite
const sqlite3 = require("sqlite3").verbose();
let sql;

const db = new sqlite3.Database("./checkers.db", sqlite3.OPEN_READWRITE, (err) =>{
    if (err) return console.error(err.message);
});

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Protects against client-side script accessing the cookie
    secure: process.env.NODE_ENV === "production", // Cookies are sent only over HTTPS
    sameSite: 'strict', // Strict sameSite setting to prevent sending the cookie along with cross-site requests
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Basic route for testing server response
app.get('/', (req, res) => {
  res.send('Checkers Game Backend is running!');
});

// Apply user authentication routes
app.use('/api/users', userRoutes);

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to sync database:", error);
});
