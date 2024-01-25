require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const expresslayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')

const setCurrentUser = require('./middlewares/set_current_user')

const marketRouter = require('./routes/market_router')
const sessionRouter = require('./routes/session_router')


app.set('view engine', 'ejs')


app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(expresslayouts)

app.use(express.urlencoded({ extended:true }))

app.use(session({
    secret: process.env.SECRET || 'mistyrose', 
    resave: false,
    saveUninitialized: true
}))

app.use(setCurrentUser)

app.get('/', (req, res) => {
    res.render('landing')
})


app.use(marketRouter)

app.use(sessionRouter)



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})