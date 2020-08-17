const Router = require('express-promise-router');
// Sanitizer & Validator
const { check, validationResult } = require('express-validator');

const db = require('../db');
const middleware = require('../middleware');

const router = new Router();

module.exports = router;

router.use(middleware.checkLogin);

router.get('/', async (req,res) => {
    const { rows } = await db.query('SELECT * FROM items');
    res.render('home', {title: "HOME", data: rows});
});