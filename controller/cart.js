const express = require('express')
const router = express.Router()

router.post('/add',(req,res)=>{
    try {
        const { id, quantity } = req.body
        var cartProducts = JSON.parse(req.cookies['cartProducts'] || '[]');
        const alreadyInCart = cartProducts.findIndex(product => product.id == id)
        if (alreadyInCart > -1) {
            cartProducts[alreadyInCart].quantity = quantity
        } else {
            cartProducts.push({ id, quantity })
        }
        res.cookie('cartProducts', JSON.stringify(cartProducts)).redirect('/demo-custom/car-project/cart')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/remove',(req,res)=>{
    try {
        const { id } = req.body
        var cartProducts = JSON.parse(req.cookies['cartProducts'] || '[]');
        cartProducts = cartProducts.filter(product => product.id != id)
        const product = req.products.find(product => product._id.toString() === id)
        res.cookie('cartProducts', JSON.stringify(cartProducts)).redirect('/demo-custom/car-project/product/' + product.url)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router