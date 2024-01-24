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

app.use(express.urlencoded({ extended:true }))



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

        const sqlToGetUsers = `SELECT * FROM users;`

        db.query(sqlToGetUsers, (err, users) => {

        })

        res.render('market', {items: items_for_sale})
    })

})

app.get('/market/item/new', (req, res) => {
    
    res.render('new_item_form')
})

app.post('/market/item', (req, res) => {

// need to input user name based on sign in 

    const cardName = req.body.card_name
    const set = req.body.set
    const rarity = req.body.rarity
    const condition = req.body.condition
    const language = req.body.language
    //const sellerUserName = 
    const price = Number(req.body.price)
    const offers = req.body.offers
    const img = req.body.img
    const shipping1 = req.body.shipping_1
    const shipping1Price = Number(req.body.shipping_1_price)
    const shipping2 = req.body.shipping_2
    const shipping2Price = Number(req.body.shipping_2_price)

    console.log(cardName, set, rarity, condition, language, price, offers, img, shipping1, shipping1Price, shipping2, shipping2Price)


    const sql = `
    INSERT INTO singles 
    (card_name, set, rarity, condition, language, price, offers, img, shipping_1, shipping_1_price, shipping_2, shipping_2_price)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `
    db.query(sql, [cardName, set, rarity, condition, language, price, offers, img, shipping1, shipping1Price, shipping2, shipping2Price], (err, result) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/market')
    }) 

})

app.get('/market/item/:id', (req, res) => {

    const id = req.params.id
    const sql = `
      SELECT * FROM singles
      WHERE id = $1;
    `
    console.log(`id is ${id}`)

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
        }

        const itemDetails = result.rows[0]

        console.log(itemDetails)

        res.render('item', {item: itemDetails})

    })
})

app.get('/market/item/:id/edit', (req, res) => {

    const id = req.params.id
    const sql = `
    SELECT * FROM singles
    WHERE id = $1;
    `

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
        }

        let existingItem = result.rows[0]

        res.render('edit_item_form', {item: existingItem})
    }) 

})

app.put('/market/item/:id', (req, res) => {

    const id = req.params.id

    const cardName = req.body.card_name
    const set = req.body.set
    const rarity = req.body.rarity
    const condition = req.body.condition
    const language = req.body.language
    const price = Number(req.body.price)
    const offers = req.body.offers === 'on'
    const img = req.body.img
    const shipping1 = req.body.shipping_1
    const shipping1Price = Number(req.body.shipping_1_price)
    const shipping2 = req.body.shipping_2
    const shipping2Price = Number(req.body.shipping_2_price)

    console.log(cardName, set, rarity, condition, language, price, offers, img, shipping1, shipping1Price, shipping2, shipping2Price)


    const sql = `
    UPDATE singles 
    SET
      card_name = $1,
      set = $2,
      rarity = $3,
      condition = $4,
      language = $5, 
      price = $6,
      offers = $7, 
      img = $8, 
      shipping_1 = $9, 
      shipping_1_price = $10, 
      shipping_2 = $11, 
      shipping_2_price = $12
    WHERE 
      id = $13;
    `
    db.query(sql, [cardName, set, rarity, condition, language, price, offers, img, shipping1, shipping1Price, shipping2, shipping2Price, id], (err, result) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/market')
    }) 
    
})

app.delete('/market/item/:id', (req, res) => {

    const id = req.params.id

    const sql = `
    DELETE FROM singles
    WHERE id = $1;
    `

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/market')
    })

})






app.listen(port, () => {
    console.log(`listening on port ${port}`);
})