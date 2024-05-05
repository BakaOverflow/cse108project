const express = require('express');
require('dotenv').config(); // Load environment variables
const sequelize = require('./config/connection'); // Import the database connection

// Passport and session management (placeholders for setup)
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration (Adjust secret and other options as needed)
app.use(session({
  secret: 'super secret', // You should store this in an environment variable
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import routes
const userRoutes = require('./routes/userRoutes'); // Placeholder for user authentication routes

// Basic route for testing that the server is running
app.get('/', (req, res) => {
  res.send('Checkers Game Backend is running!');
});

// Use routes
app.use('/api/users', userRoutes); // Placeholder for actual user route file

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to sync database:", error);
});
