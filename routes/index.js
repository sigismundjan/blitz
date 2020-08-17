const middleware = require('../middleware');

const auth = require('./auth');
const users = require('./user');
const home = require('./home');
const items = require('./items');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('landing', {title: 'WELCOME'});
    });

    app.use('/auth', auth);
    app.use('/home', home);
    app.use('/item', items);
    app.use('/user', users);
};