// Import the Express framework to create the server
import express from 'express';
// Tools to work with file and directory paths
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
// Import the database connection object
import { connection } from './server/db/connection.js'
// Middleware to handle form data and JSON in requests
import bodyParser from 'body-parser';
// Import the router that handles order-related requests
import ordersRouter from './server/routes/orders.js'

// Get the absolute path to the current directory
const __dirname = dirname(fileURLToPath(import.meta.url)); // our folder URL
// Create an Express app instance
const app = express(); // our server object
// Define the port where the server will run
const port = 8080;

// Serve static files (HTML, CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Parse URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse both URL-encoded data and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use the orders router for any route that starts with '/order'
app.use('/order', ordersRouter);

// Route that gets all products from the database and sends them back
app.get('/products',(req,res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        res.send(results)
    });
});

// Serve the index.html file when user navigates to '/index.html'
app.get('/index.html',(req,res) => {
const indexpath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexpath)
})

// Start the server and listen on the specified port
app.listen(port,() => {
    console.log(`listening on port ${port}`);
})

// Default route: if user goes to '/', serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
