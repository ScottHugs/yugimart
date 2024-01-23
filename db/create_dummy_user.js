require('dotenv').config()
const bcrypt = require('bcrypt')
const db = require('./index')

const userName = 'scottyScalper'
const email = 'sh@goog.com'
const plainTextPass = 'bewd'
const saltRound = 10 

bcrypt.genSalt(saltRound, (err, salt) => {

    bcrypt.hash(plainTextPass, salt, (err, hashedPass) => {

        const sql =`
         INSERT INTO users
         (user_name, email, password_digest)
         VALUES
         ('${userName}', '${email}', '${hashedPass}')
         RETURNING id;
        `

        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {

                console.log('user created')
                console.log(result.rows)
            }

        })
    })
})