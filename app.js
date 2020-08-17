// Express
const express = require('express');
// Parser
const bodyParser = require('body-parser');
// CSRF
const csurf = require('csurf');
// Sanitizer & Validator
const { check, validationResult } = require('express-validator');
// Session
const session = require('express-session');
// Cookie
const cookieParser = require('cookie-parser');
// ENV
const dotenv = require('dotenv');
dotenv.config();
// Middlewares
const middleware = require('./middleware');
// Routes
const mountRoutes = require('./routes');

const app = express();
// Attaching Global Middleware(S)
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','pug');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session(
    {
        secret:process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    }
));
app.use(middleware.session);

mountRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Listening to http:\\\\${process.env.HOST}:${process.env.PORT}`);
});