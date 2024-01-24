require('dotenv').config()

const db = require('../db/index')

function setCurrentUser(req, res, next) {

    res.locals.currentUserDetails = {}
    res.locals.isLoggedIn = false

    let userId = req.session.userId

    if (!userId) {
        return next()
    }

    const sql =`
    SELECT * FROM users
    WHERE id = $1;
    `
    db.query(sql, [userId], (err, result) => {

        if (err) {
            console.log(err)
        } 

        res.locals.currentUserDetails = result.rows[0]
        res.locals.isLoggedIn = true
        next() 

    })
}

module.exports = setCurrentUser