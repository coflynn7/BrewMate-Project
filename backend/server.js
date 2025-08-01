const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const pool = require('./db');
const app = express();
const PORT = 5000;

//middleware
app.use(cors());     // Allow all origins (for dev purposes)
app.use(express.json());

//the API endpoints are defined below

//login requests
app.post('/api/login', async (req, res) => {
  //extract the username and pw that the user entered
  const {username, password} = req.body;

  //check them against the database
  //not doing anything fancy/ too secure for this project
    try {
      const [rows] = await pool.query(`select * from users where username = ? and replace(password, char(13), '') = ?`, 
        [username, password]);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

       res.json({ message: 'Login successful!'});
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

//searching the beer database given user-selected filters
app.get('/api/search', (req, res) => {
  //extract search criteria provided by the user
  const {beerName, style} = req.query;
  
  //temp hardcoding query results for test purposes
  const results = [
    {beerName: "Hamm's Special Light", beerStyle: "Lager"},
    {beerName: "Guinness", beerStyle: "Stout"}
  ];

  res.json({ results });
});

//getting the beer styles in the dataset
app.get('/api/uniqueBeerStyles', async (req, res) => {
    try {
      const [rows] = await pool.query('select distinct style from beer order by style');
      res.json(rows);
    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to fetch beer list' });
  }
})

//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});