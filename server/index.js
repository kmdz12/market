require('dotenv').config()

//Imports, requires, etc...
const express = require('express');
const cors = require('cors');
const pool = require('./database/db.js');

//Express Init
const app = express();

//Middlewares
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Port to listen.
const port = 3000;

//Routes
app.use('/', require('./routes/router.js'));

//Server init
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})