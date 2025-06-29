import express from 'express';

import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import { connection } from './connection.js'


console.log(import.meta.url);
console.log(fileURLToPath(import.meta.url));
console.log(dirname(fileURLToPath(import.meta.url)));
const __dirname = dirname(fileURLToPath(import.meta.url)); // our folder URL


const app = express(); // our server object
const port = 8080;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.get('/products',(req,res) => {
    // get from db all products
    // create html template for each product
    connection.query('SELECT * FROM products', (err, results) => {
        res.send(results)
    });
});

app.post('/order', (req, res)=> {
    console.log("got an order!");
});

app.get('/index.html',(req,res) => {
    const indexpath = path.join(__dirname,'/index.html');
    res.sendFile(indexpath)
})

app.listen(port,() => {
    console.log(`listening on port ${port}`);
})