const { Pool } = require('pg');

const pool = new Pool({

    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE_DB,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB
});

console.log(`Connected to Database!`);

module.exports = pool;