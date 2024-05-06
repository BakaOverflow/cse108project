const express = require('express');
require('dotenv').config(); // Load environment variables early
const sequelize = require('./config/connection'); // Adjust as needed for your DB
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig'); // Make sure to configure Passport strategies here
const userRoutes = require('./routes/userRoutes'); // Ensure this file exists and is set up

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration, using an environment variable for the secret
app.use(session({
  secret: process.env.SESSION_SECRET, // Better to use an environment variable
  resave: false,
  saveUninitialized: true,
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
