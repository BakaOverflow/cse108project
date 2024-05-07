// Modified to allow websockets.

const express = require('express');
const cors = require('cors');  // Import CORS module
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config(); // Load environment variables
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig'); // Ensure Passport configuration is properly set up
const userRoutes = require('./routes/userRoutes'); // User authentication routes
const sqlite3 = require("sqlite3").verbose(); // SQLite for database interactions

const app = express();
const server = http.createServer(app);  // Create HTTP server passing the Express app
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:9000',
    methods: ["GET", "POST"],
    credentials: true
  }
}); // Initialize Socket.IO with the server instance

// CORS configuration to allow requests from the frontend URL
app.use(cors({
  origin: 'http://localhost:9000',
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

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('move', (data) => {
    console.log('Move received:', data);
    io.emit('move', data); // Broadcast move to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Basic route for testing server response
app.get('/', (req, res) => {
  res.send('Checkers Game Backend is running!');
});

// Apply user authentication routes
app.use('/api/users', userRoutes);

// Start both HTTP and WebSocket server on the same port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
