const express = require('express')
const router = express.Router()

// ecommerce
router.use('/category', require('./category'))
router.use('/vehicle', require('./vehicle'))
router.use('/coupon', require('./coupon'))
router.use('/order', require('./order'))
router.use('/cart', require('./cart'))

router.use('/letter',require('./letter'))
router.use('/banner',require('./banner'))
router.use('/section',require('./section'))
router.use('/upload',require('./upload'))
router.use('/settings',require('./settings'))
router.use('/auth',require('./authentication'))

module.exports = router