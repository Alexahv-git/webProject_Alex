// Import the MySQL library (mysql2 is a modern version with promises support)
import mysql from 'mysql2';
// Create and export a connection object to the MySQL database
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '571997',
  database: 'drinkwater'
});