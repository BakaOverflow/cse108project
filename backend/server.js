const express = require('express');
const cors = require('cors');  // Import CORS module
require('dotenv').config();
const sequelize = require('./config/connection');
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration to allow requests from the frontend URL
app.use(cors({
  origin: 'http://localhost:9000', // This is the URL of your frontend application
  credentials: true  // Allows cookies to be sent and received
}));

// Other middleware configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
  res.send('Checkers Game Backend is running!');
});
app.use('/api/users', userRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to sync database:", error);
});
