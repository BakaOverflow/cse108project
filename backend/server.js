const express = require('express');
const app = express();
const PORT = 3000;  // You can choose the port

app.get('/', (req, res) => {
  res.send('Checkers Game Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
