const  mysql = require('mysql');
const  connection = mysql.createConnection({
  host :  'localhost', // address of the server
  user :  'root', // username
  password :  '327d361f',
  database :  'Create_movie',
});
module.exports = connection;
