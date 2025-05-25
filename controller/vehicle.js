const express = require('express')
const Vehicle = require('../schema/Vehicle')
const router = express.Router()

router.post('/create', async (req, res) => {
    // return res.json({ success: true, data: req.body })
    var { thumbnail, images, title, categories, registrationDate, fuelType, model, manufacturer, range, gearbox, seats, serviceHistory, bodyType, description, price, tax, checkup } = req.body
    console.log('req.body', req.body)
    try {
        images = JSON.parse(images)
    } catch (error) {
        images = []
    }
    // var { title, description, model, oem, itemNo, price, stock, sku, tax, image, categories } = req.body
    try {
        // Assuming you have a Vehicle model defined
        if (Array.isArray(categories)) categories = categories.filter(category => category !== '')
        await Vehicle.create({ thumbnail, images, title, categories, registrationDate, fuelType, model, manufacturer, range, gearbox, seats, serviceHistory, bodyType, description, price, tax, checkup })
        return res.redirect(`/demo-custom/car-project/admin/new-vehicle?success=Vehicle created successfully`)
        // return res.redirect(`/demo-custom/car-project/admin/vehicle-list`)
    } catch (error) {
        console.error('Error creating vehicle:', error)
        return res.redirect(`/demo-custom/car-project/admin/new-vehicle?error=${error.message}`)
    }
})

router.post('/edit', async (req, res) => {
    var { id, thumbnail, image, title, categories, registrationDate, fuelType, model, manufacturer, range, gearbox, seats, serviceHistory, bodyType, description, price, tax, checkup } = req.body
    try {
        if (Array.isArray(categories)) categories = categories.filter(category => category !== '')
        await Vehicle.findByIdAndUpdate(id, { thumbnail, image, title, categories, registrationDate, fuelType, model, manufacturer, range, gearbox, seats, serviceHistory, bodyType, description, price, tax, checkup })
        return res.redirect(`/demo-custom/car-project/admin/vehicle-list?success=Vehicle updated successfully`)
    } catch (error) {
        console.error('Error updating vehicle:', error)
        return res.redirect(`/demo-custom/car-project/admin/edit-vehicle/${id}?error=${error.message}`)
    }
})

router.post('/delete', async (req, res) => {
    var { id } = req.body
    try {
        await Vehicle.findByIdAndDelete(id)
        return res.redirect(`/demo-custom/car-project/admin/vehicle-list?success=Vehicle deleted successfully`)
    } catch (error) {
        console.error('Error deleting vehicle:', error)
        return res.redirect(`/demo-custom/car-project/admin/vehicle-list?error=${error.message}`)
    }
})

router.post('/fetch', async (req, res) => {
    var { filter = {} } = req.body
    try {
        // Assuming you have a Vehicle model defined
        const products = await Vehicle.find(filter).populate('categories')
        return res.json({ products, success: true })
        // return res.redirect(`/demo-custom/car-project/admin/vehicle-list`)
    } catch (error) {
        console.error('Error creating vehicle:', error)
        return res.json({ error: error.message, success: false })
    }
})

module.exports = router