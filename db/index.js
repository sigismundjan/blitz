// ENV
const dotenv = require('dotenv');
dotenv.config();
// Node PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    passowrd: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};