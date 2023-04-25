
// import path from "path";
// import { Url } from "url";


const url = require('url');
const path = require('path')

// import fs from 'fs'
const { response } = require('express');
const express = require('express');
const router = require('./app/controllers/router');


const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors({
    methods:['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'app', 'views')));



// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));




app.listen(port, () => {
    console.log(`Practica 3 puerto ${port}!`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./app/views/home.html"));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "./app/views/home.html"));
});

app.get('/products/cart', (req, res) => {
    res.sendFile(path.join(__dirname, "./app/views/shopping_cart.html"));
});


app.get('/carrito.js', (req, res) => {
    res.sendFile(path.join(__dirname, "./app/views/shopping_cart.html"));
});

app.use(router);