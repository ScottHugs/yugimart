require('dotenv').config()

const express = require('express')
const app = express()
const port = 7061
const expresslayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const db = require('./db/index')
app.set('view engine', 'ejs')



app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(expresslayouts)


app.get('/', (req, res) => {
    res.redirect('/market')
})

app.get('/market', (req, res) => {

    const sql =`SELECT * FROM singles;`

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }

        const items_for_sale = result.rows

        res.render('market', {items: items_for_sale})
    })

})

app.get('/market/item', (req, res) => {
    res.render('item')
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})