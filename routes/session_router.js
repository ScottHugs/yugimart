const express = require('express')
const router = express.Router()
const db = require('../db/index')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {

    res.render('login')

})

router.post('/login', (req, res) => {

    const username = req.body.username
    const plainTextPassword = req.body.password

    const sql = `
    SELECT * FROM users
    WHERE username = $1;
    `

    db.query(sql, [username], (err, result) => {

        if (err) {
            console.log(err)
        } 

        if (result.rows.length === 0){
            console.log('username not found')
            res.redirect('login')
            return
        }

        const hashedPassword = result.rows[0].password_digest

        bcrypt.compare(plainTextPassword, hashedPassword, (passwordErr, isCorrect) => {
            if (passwordErr) {
                console.log(passwordErr)
            } 

            if (!isCorrect) {
                console.log('password does not match')
                res.redirect('login')
                return
            }

            req.session.userId = result.rows[0].id
            
            res.redirect('/')

        })

    })


})

router.delete('/logout', (req, res) => {

    req.session.userId = null

    res.redirect('/')

})

router.get('/login/new', (req, res) => {

    res.render('create_account_form')
})

router.post('/login/new', (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const address = req.body.address
    const password1 = req.body.password1
    const password2 = req.body.password2

    if (username === '') {
        console.log('must have a username')
        res.redirect('/login/new')
        return
    }
    if (password1 !== password2) {
        console.log('passwords must match')
        res.redirect('/login/new')
        return
    }

    const plainTextPassword = password1 

    const sql =`
    SELECT username FROM users
    WHERE username = $1;
    `

    db.query(sql ,[username], (usernameErr, usernameResult ) => {
        if (usernameErr) {
            console.log(usernameErr)
        }

        if (usernameResult.rows.length !== 0) {
            console.log('That username is already in use.')
            res.redirect('/login/new')
            return
        }

        const saltRound = 10

        bcrypt.genSalt(saltRound, (err, salt) => {

            bcrypt.hash(plainTextPassword, salt, (err, hashedPassword) => {

                const sql =`
                INSERT INTO users
                (username, email, address, password_digest)
                VALUES
                ($1, $2, $3, $4)
                RETURNING id;
                `
                db.query(sql, [username, email, address, hashedPassword], (err, result) => {
                    if (err) {
                        console.log(err)
                    }

                    req.session.userId = result.rows[0].id
        
                    res.redirect('/market')
            })
        })

        })

    })

})

module.exports = router