const express = require('express');
const Order = require('../schema/Order');
const router = express.Router()

router.post('/new', async (req, res) => {
    try {
        var { firstName, lastName, email, comment, deliveryFirstName, deliveryLastName, phone, company, country, address, city, state, zipCode, paymentType, coupon } = req.body
        // const user = req.user
        // if (!user) {
        //     return res.redirect('/demo-custom/car-project/admin/login')
        // }
        const user = req.user?.id
        const products = JSON.parse(req.cookies['cartProducts'] || '[]')
        const creation = products.filter((item) => item.type == 'letter').map((item => ({
            items: item.id.map((id,ind) => ({
                letter: id,
                imageIndex: item.items[ind]
            })),
            quantity: item.quantity,
        })))
        console.log('products', products)
        console.log('creation', JSON.stringify(creation))
        // return
        const order = await Order.create({
            status: 'pending',
            user,
            products: products.map((item) => ({
                product: item.id,
                quantity: item.quantity
            })),
            creation,
            firstName,
            lastName,
            email,
            comment,
            deliveryFirstName,
            deliveryLastName,
            phone,
            company,
            country,
            address,
            city,
            state,
            zipCode,
            paymentType,
            coupon
        })
        return res.cookie('cartProducts', '[]').redirect('/demo-custom/car-project/checkout?message=Order created successfully')
    } catch (error) {
        console.log(error)
        return res.redirect('/demo-custom/car-project/checkout?error=Error creating order')
    }
})

router.post('/update', async (req, res) => {
    const { orderId, status } = req.body
    try {
        await Order.findOneAndUpdate({ orderId }, { status }, { new: true })
        return res.redirect(`/demo-custom/car-project/admin/order/${orderId}?message=Order updated successfully`)
    } catch (error) {
        if (orderId) {
            return res.redirect(`/demo-custom/car-project/admin/order/${orderId}?error=${error.message}`)
        }
        return res.redirect(`/demo-custom/car-project/admin/orders/list?message=Order updated successfully`)
    }
})

module.exports = router