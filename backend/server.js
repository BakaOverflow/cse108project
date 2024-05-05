const express = require('express');

const app = express();
const PORT = 3000;  // You can choose the port

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing that the server is running
app.get('/', (req, res) => {
  res.send('Checkers Game Backend is running!');
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
