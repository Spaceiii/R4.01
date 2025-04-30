const authController = require('../controllers/authController');
module.exports = (app, password) => {
    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/signin');
    }

    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/home', isLoggedIn, authController.home);
    app.get('/logout', authController.logout);

    app.post('/signup', password.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signup'
    }));
    app.post('/signin', password.authenticate('local-signin', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    }));
}