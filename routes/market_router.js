const express = require('express')
const router = express.Router()
const db = require('../db/index')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')


router.get('/market', (req, res) => {

    const sql =`SELECT * FROM singles;`

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }

        const items_for_sale = result.rows

        res.render('market', {items: items_for_sale})
    })

})

router.post('/market/search', (req, res) => {

    const cardSearch = req.body.card_name
    const sql =`
    SELECT * FROM singles
    WHERE card_name = $1;
    `

    db.query(sql, [cardSearch], (err, result) => {
        if (err) {
            console.log(err)
        }

        const items_for_sale = result.rows

        res.render('market', {items: items_for_sale})
    })

})

router.get('/market/:seller', (req, res) => {
    
    const sellerUsername = req.params.seller
    const sql =`
    SELECT * FROM singles
    WHERE seller_username = $1;
    `

    db.query(sql, [sellerUsername], (err, result) => {
        if (err) {
            console.log(err)
        }

        const items_for_sale = result.rows

        res.render('market', {items: items_for_sale})
    })

})

router.get('/market/ordered/:by', (req, res) => {
    
    const orderedBy = req.params.by
    const sql =`
    SELECT * FROM singles
    ORDER BY ${orderedBy} ASC;
    `

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }

        const items_for_sale = result.rows

        res.render('market', {items: items_for_sale})
    })

})

router.get('/market/item/new', ensureLoggedIn, (req, res) => {
    
    res.render('new_item_form')
})

router.post('/market/item', ensureLoggedIn, (req, res) => {

    const userId = req.session.userId
    const sql = `
    SELECT username FROM users
    WHERE id = $1;
    `

    db.query(sql, [userId], (usernameErr, usernameResult) => {

        if (usernameErr) {
            console.log(usernameErr)
        }

        const cardName = req.body.card_name
        const set = req.body.set
        const rarity = req.body.rarity
        const condition = req.body.condition
        const language = req.body.language
        const sellerUserName = usernameResult.rows[0].username
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
        (card_name, set, rarity, condition, language, seller_username, price, offers, img, shipping_1, shipping_1_price, shipping_2, shipping_2_price)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `
        db.query(sql, [cardName, set, rarity, condition, language, sellerUserName, price, offers, img, shipping1, shipping1Price, shipping2, shipping2Price], (err, result) => {
            if (err) {
                console.log(err)
            }
    
            res.redirect('/market')
        }) 

    }) 

})

router.delete('/market/item/:id/buy', (req, res) => {
    
    const id = req.params.id

    const sql = `
    DELETE FROM singles
    WHERE id = $1;
    `

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
        }

        res.render('payment')
    })
})

router.get('/market/item/:id', (req, res) => {

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

router.get('/market/item/:id/edit', ensureLoggedIn, (req, res) => {

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

router.put('/market/item/:id', ensureLoggedIn, (req, res) => {

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

router.delete('/market/item/:id', ensureLoggedIn, (req, res) => {

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

module.exports = router