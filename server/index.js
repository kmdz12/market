require('dotenv').config()

//Imports, requires, etc...
const express = require('express');
const cors = require('cors');
const pool = require('./database/db.js');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

//Express Init
const app = express();

//Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://km12-develop.netlify.app'],
    // mobile
    // origin: ['http://localhost:5173', 'http://192.168.1.33:5173'],
    credentials: true
}));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'sessions',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1
    }
}))

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

// mobile
// app.listen(3000, '192.168.1.33')