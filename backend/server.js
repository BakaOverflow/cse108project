const express = require('express');
const cors = require('cors');  // Import CORS module
require('dotenv').config(); // Load environment variables
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig'); // Ensure Passport configuration is properly set up
const userRoutes = require('./routes/userRoutes'); // User authentication routes
const sqlite3 = require("sqlite3").verbose(); // SQLite for database interactions

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration to allow requests from the frontend URL
app.use(cors({
  origin: 'http://localhost:9000', // Adjust as needed if your frontend is at a different URL
  credentials: true  // Allows cookies to be sent and received
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration with enhanced security settings
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Protects against client-side script accessing the cookie
    secure: process.env.NODE_ENV === "production", // Ensures cookies are sent only over HTTPS
    sameSite: 'strict', // Strict sameSite setting to prevent sending the cookie along with cross-site requests
    maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 24 hours
  }
}));

// Initialize Passport middleware for user authentication
app.use(passport.initialize());
app.use(passport.session());

// Initialize SQLite Database
const db = new sqlite3.Database("./checkers.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the SQLite database.');
});

// Basic route for testing server response
app.get('/', (req, res) => {
  res.send('Checkers Game Backend is running!');
});

// Apply user authentication routes
app.use('/api/users', userRoutes);

// Instead of Sequelize, maybe some other DB initialization or sync process
// For now, just start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
