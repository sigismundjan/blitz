const Router = require('express-promise-router');
// Sanitizer & Validator
const { check, validationResult } = require('express-validator');
// Session
const session = require('express-session');

const db = require('../db');
const bcrypt = require('bcryptjs');

const router = new Router();

module.exports = router;

router.post('/login',
    [
        check('email').isEmail().normalizeEmail(),
        check('password').exists(),
    ],
    async (req, res) => {
        const { email, password } = req.body;
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows[0]) {
            await bcrypt.compare(password, rows[0]['password'])
                .then((bres) => {
                    if (bres) {
                        delete rows[0]['password'];
                        req.session.user = rows[0];
                        res.redirect('/home');
                    } else {
                        req.session.error = 'Wrong Password';
                        res.redirect('/');
                    }
                });
        } else {
            req.session.error = 'Email not found';
            res.redirect('/');
        }
    }
);

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});