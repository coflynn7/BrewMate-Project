const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

//middleware
app.use(cors());     // Allow all origins (for dev purposes)
app.use(express.json());

//API endpoints
app.post('/api/login', (req, res) => {
  const {username, password} = req.body;
  res.json({ message: `This is a placeholder! ${username} ${password}` });
});

//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});