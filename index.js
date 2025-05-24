const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
require('./db')

const authValidator = require('./middleware/authValidator')

const generateUrl = require('./helper/generateUrl')
const Category = require('./schema/Category')
const Vehicle = require('./schema/Vehicle')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(authValidator())

app.set('view engine', 'ejs');
app.use('/demo-custom/car-project', express.static(__dirname + '/views'));

const PORT = process.env.PORT || 6877

app.get('/demo-custom/car-project', async (req, res) => {
    const vehicles = await Vehicle.find().populate('categories')
    res.render('index', { vehicles })
});

app.get('/demo-custom/car-project/car', async (req, res) => {
    const vehicles = await Vehicle.find().populate('categories')
    res.render('car', { vehicles })
});

app.get('/demo-custom/car-project/contact', (req, res) => {
    res.render('contact')
});

app.get('/demo-custom/car-project/reviews', (req, res) => {
    res.render('reviews')
});

app.get('/demo-custom/car-project/usedcars', (req, res) => {
    res.render('usedcars')
});

app.get('/demo-custom/car-project/privacy-policy', (req, res) => {
    res.render('privacy-policy')
});

app.get('/demo-custom/car-project/vehicle/:url', async (req, res) => {
    const vehicle = await Vehicle.findOne({ url: req.params.url }).populate('categories');
    if (!vehicle) {
        return res.status(404).render('404');
    }
    res.render('vehicle', { vehicle });
});

app.get('/demo-custom/car-project/checkout', (req, res) => {
    const categories = req.formattedCategories
    const cartProducts = req.cartProducts
    res.render('checkout', { categories, cartProducts })
});


app.use('/demo-custom/car-project/admin', require('./admin'))
app.use('/demo-custom/car-project/api', require('./controller/apiHandler'))

app.listen(PORT, () => {
    console.log(`App is live on: http://localhost:${PORT}/demo-custom/car-project`)
})