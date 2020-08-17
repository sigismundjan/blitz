module.exports = {
    logging: (req, res, next) => {
        console.log(req);
        next();
    },
    session: (req, res, next) => {
        res.locals.session = req.session;
        next();
    },
    checkLogin: (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            req.session.error = 'You need to Login first';
            res.redirect('/');
        }
    }
};