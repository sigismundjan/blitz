// ENV
const dotenv = require('dotenv');
dotenv.config();
// Node PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};