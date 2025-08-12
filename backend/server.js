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
      const [rows] = await pool.query(`select * from users where username = ? and password = ?`, 
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

//register a new user
app.post('/api/register', async (req, res) => {

  const {username, password} = req.body;

  //make sure that username isn't already taken
    try {
      const [rows] = await pool.query(`select * from users where username = ?`, 
        [username]);

      if (rows.length > 0) {
        return res.status(409).json({ message: 'Username already in use' });
      }

      await pool.query(`insert into users (username, password) values (?, ?)`, 
        [username, password]);

       res.json({ message: 'Register successful!'});
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during register process' });
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

//retrieving recent reviews
app.get('/api/recentReviews', async (req, res) => {
    try {
      const [rows] = await pool.query('select r.*,b.Name from reviews r inner join beer b on r.beer_id = b.beer_id order by r.review_date desc limit 15');
      res.json(rows);
    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to retrieve recent reviews' });
  }
})

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

app.get('/api/topbeers', async (req, res) => {
    try {

    const targetScore = Number(req.query.targetScore) || 4;
    const offsetAmt   = Number(req.query.offset) || 0;
	  
	  //we could implement logic to set the offset amount equal to the size of the # of records per page * page
	  console.time('proc')

    const [rows] = await pool.query('CALL top_beers(?, ? );', [targetScore, offsetAmt]);
		
	 // const [[{ totCount }]] = await pool.query('SELECT @totCount AS totCount');
	  console.timeEnd('proc')

    res.json(rows);

    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to fetch beer list' });
  }
})

app.get('/api/topBreweries', async (req, res) => {
    try {

    const targetScore = Number(req.query.targetScore) || 4;
    const offsetAmt   = Number(req.query.offset) || 0;
	  
	  //we could implement logic to set the offset amount equal to the size of the # of records per page * page
	  console.time('proc')

    const [rows] = await pool.query('CALL top_brewery(?, ? );', [targetScore, offsetAmt]);
		
	  console.timeEnd('proc')

    res.json(rows);

    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to fetch top breweries' });
  }
})

app.post('/api/addFavorite', async (req, res) => {
  const {beerId, userId} = req.body;

    try {
      await pool.query(`insert into favoritebeers (beer_id, username) values (?, ?)`, 
        [beerId, userId]);

       res.json({ message: 'Favorite added successfully!'});
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during add favorite process' });
    }
})

app.get('/api/favs', async (req, res) => {
    try {
      
    const userId = req.query.username;
    
	  //we could implement logic to set the offset amount equal to the size of the # of records per page * page
	  console.time('proc')

    const [rows] = await pool.query('CALL user_favorites(?);', [userId]);

	  console.timeEnd('proc')

    res.json(rows);

    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to fetch favorites' });
  }
})

app.get('/api/mostFavorited', async (req, res) => {
    try {
	  //we could implement logic to set the offset amount equal to the size of the # of records per page * page
	  console.time('proc')

    const [rows] = await pool.query('CALL most_favorited();');
		
	 // const [[{ totCount }]] = await pool.query('SELECT @totCount AS totCount');
	  console.timeEnd('proc')

    res.json(rows);

    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to fetch most favorited beers' });
  }
})

app.get('/api/findBeer', async (req, res) => {
    try {
      
    let beerName = req.query.beerName.trim().toLowerCase();
    
	  console.time('proc')

    const [rows] = await pool.query('CALL beer_search_name(?);', [beerName]);
    
	  console.timeEnd('proc')

    res.json(rows);

    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to perform beer search' });
  }
})

app.post('/api/addReview', async (req, res) => {
  const {userId, beerId, timestamp, overall, palette, aroma, appearance, taste} = req.body;

    try {
      await pool.query(`CALL insert_review (?, ?, ?, ?, ?, ?, ?, ?);`, 
        [userId, beerId, timestamp, overall, palette, aroma, appearance, taste]);

       res.json({ message: 'Review added successfully!'});
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during add review process' });
    }
})

app.get('/api/myReviews', async (req, res) => {
    try {
      
    const userId = req.query.userId;
    
	  console.time('proc')

    const [rows] = await pool.query('select * from reviews where username = ?;', [userId]);

	  console.timeEnd('proc')

    res.json(rows);

    } 
    catch (err) {
      console.error('DB query error:', err);
      res.status(500).json({ error: 'Failed to fetch favorites' });
  }
})

//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});