const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig');
const userRoutes = require('./routes/userRoutes');
const sqlite3 = require("sqlite3").verbose();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust according to your frontend's actual deployment URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// CORS configuration to allow requests from the frontend URL
app.use(cors({
  origin: "*", // Adjust according to your frontend's actual deployment URL
  credentials: true
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
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Apply user authentication routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
