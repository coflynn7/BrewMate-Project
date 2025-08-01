const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'coflynn7',          //Tyler - change this to your user
  password: '444aaa',  //Tyler - and this
  database: 'beermate',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//use .promise() to support async/await
const db = pool.promise();

module.exports = db;
