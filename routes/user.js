const Router = require('express-promise-router');
// Sanitizer & Validator
const { check, validationResult } = require('express-validator');

const db = require('../db');

const router = new Router();

module.exports = router;

router.post('/login',
    [
        check('email').isEmail().normalizeEmail()
    ],
    async (req, res, next) => {

    }
);

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    res.send(rows[0]);
});