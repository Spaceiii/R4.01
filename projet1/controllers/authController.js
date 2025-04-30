exports.signup = (req, res) => {
    res.render('signup');
}

exports.signin = (req, res) => {
    res.render('signin');
}

exports.home = (req, res) => {
    res.render('home', {
        user: req.user
    });
}

exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.session.destroy(err => {
            res.redirect('/');
        });
    });
};
