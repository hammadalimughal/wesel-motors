const express = require('express')
const router = express.Router()
const Banner = require('./schema/Banner')
const Setting = require('./schema/Setting')
const Section = require('./schema/Section')
const Letter = require('./schema/Letter')
const Category = require('./schema/Category')
const Vehicle = require('./schema/Vehicle')
const Coupon = require('./schema/Coupon')
const Order = require('./schema/Order')
const User = require('./schema/User')

router.get('/', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const orders = await Order.find({
            createdAt: { $gte: threeDaysAgo }
        });
        const totalOrderCount = await Order.countDocuments();
        const totalCustomers = await Order.distinct('email').countDocuments();
        return res.render('admin/index', { user, orders, totalOrderCount, totalCustomers })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/cms/banner', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        const banners = await Banner.find()
        return res.render('admin/banner', { banners, user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/cms/section', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        const sections = await Section.find()
        return res.render('admin/section', { sections, user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/letters/:letterType', async (req, res) => {
    const user = req.user
    const { letterType } = req.params
    const { char } = req.query
    console.log('user', user)
    console.log('letterType', letterType)
    if (user?.role == 'admin') {
        const letter = await Letter.find({ letterType, letter: char ? char : 'A' })
        const uniqueLetters = await Letter.distinct('letter');
        console.log(uniqueLetters);
        return res.render('admin/letters', { letter, user, letterType, uniqueLetters, char })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/settings', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        const setting = await Setting.findOne()
        return res.render('admin/settings', { setting, user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/new-vehicle', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        const categories = await Category.find()
        return res.render('admin/new-vehicle', { categories, user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/edit-vehicle/:id', async (req, res) => {
    const user = req.user
    const { id } = req.params
    console.log('user', user)
    if (user?.role == 'admin') {
        const categories = await Category.find()
        const vehicle = await Vehicle.findById(id).populate('categories')
        return res.render('admin/edit-vehicle', { categories, user, vehicle })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/vehicle-list', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        const vehicles = await Vehicle.find().populate('categories')
        return res.render('admin/vehicle-list', { vehicles, user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/new-category', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        return res.render('admin/new-category', { user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/edit-category/:id', async (req, res) => {
    const user = req.user
    const { id } = req.params
    console.log('user', user)
    if (user?.role == 'admin') {
        const category = await Category.findById(id)
        return res.render('admin/edit-category', { category, user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/category-list', async (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role == 'admin') {
        const categories = await Category.find()
        return res.render('admin/category-list', { categories, user })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/coupon/new', async (req, res) => {
    const user = req.user
    if (user?.role == 'admin') {
        const categories = await Category.find()
        return res.render('admin/coupon-add', { user, categories })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/coupon/list', async (req, res) => {
    const user = req.user
    if (user?.role == 'admin') {
        const coupons = await Coupon.find()
        // .populate('categories')
        return res.render('admin/coupon-list', { user, coupons })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/orders/list', async (req, res) => {
    const user = req.user
    if (user?.role == 'admin') {
        const orders = await Order.find()
        const totalOrderCount = await Order.countDocuments();
        const totalRefunded = await Order.countDocuments({ status: 'refunded' });
        const totalCompleted = await Order.countDocuments({ status: 'completed' });
        const totalPending = await Order.countDocuments({ status: 'pending' });
        return res.render('admin/orders-list', { user, orders, totalOrderCount, totalRefunded, totalCompleted, totalPending })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})

router.get('/order/:orderId', async (req, res) => {
    const user = req.user
    const { orderId } = req.params
    if (user?.role == 'admin') {
        const order = await Order.findOne({ orderId })
            .populate('user')
            .populate('products.product')
            // .populate('creation.items.letter')
            .populate('coupon');
        return res.render('admin/order-detail', { user, order: order._doc })
    }
    return res.redirect('/demo-custom/car-project/admin/login')
})


router.get('/login', (req, res) => {
    const user = req.user
    console.log('user', user)
    if (user?.role !== 'admin') {
        return res.render('admin/signin')
    }
    return res.redirect('/demo-custom/car-project/admin')
});

module.exports = router