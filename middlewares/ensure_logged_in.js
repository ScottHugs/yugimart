function ensureLoggedIn(req, res, next) {

    if (req.session.userId) {
        next()
    } else {
        res.render('permission_required')
    }

}

module.exports = ensureLoggedIn