require('dotenv').config()

const express = require('express')
const app = express()
const port = 7061
const expresslayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const db = require('./db/index')
const bcrypt = require('bcrypt')

const setCurrentUser = require('./middlewares/set_current_user')
const ensureLoggedIn = require('./middlewares/ensure_logged_in')

const marketRouter = require('./routes/market_router')
const sessionRouter = require('./routes/session_router')


app.set('view engine', 'ejs')


app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(expresslayouts)

app.use(express.urlencoded({ extended:true }))

app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true
}))

app.use(setCurrentUser)

app.get('/', (req, res) => {
    res.redirect('/market')
})


app.use(marketRouter)

app.use(sessionRouter)



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})