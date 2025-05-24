const express = require('express')
const Letter = require('../schema/Letter')
const router = express.Router()

router.post('/new', async (req, res) => {
    try {
        const { letter, letterType, images } = req.body
        await Letter.create({ letter, letterType, images })
        res.redirect('/demo-custom/car-project/admin/letters')
    } catch (error) {
        res.redirect(`/demo-custom/car-project/admin/letters?error=${error.message}`)
    }
})

router.post('/edit', async (req, res) => {
    try {
        const { favicon, logo, title, metaTags, metaDescription, themeColor } = req.body
        const setting = await Setting.findOne()
        setting.favicon = favicon
        setting.logo = logo
        setting.title = title
        setting.metaTags = metaTags
        setting.metaDescription = metaDescription
        setting.themeColor = themeColor
        await setting.save()
        res.redirect('/demo-custom/car-project/admin/settings')
    } catch (error) {
        res.redirect(`/demo-custom/car-project/admin/settings?error=${error.message}`)
    }
})

router.post('/fetch', async (req, res) => {
    try {
        const { letter, type } = req.body
        console.log(req.body)
        const letters = await Letter.find({ letter, letterType: type })
        console.log(letters.length)
        res.json({
            success: true,
            data: letters
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
})

router.post('/fetchbyids', async (req, res) => {
    try {
        const { ids } = req.body
        console.log(req.body)
        const letters = await Letter.find({ _id: ids })
        console.log(letters.length)
        res.json({
            success: true,
            data: letters
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
})

module.exports = router