
function isLoggedIn(req, res, next) {
    if(req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    isLoggedIn: isLoggedIn
}