module.exports.isLoggedIn = (req, res, next) => {

    console.log("REQ USER...", req.user)
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to sigh in');
        return res.redirect('/login')
    }
    next();
}

