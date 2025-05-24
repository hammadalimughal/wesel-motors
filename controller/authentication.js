const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../env.json');
const User = require('../schema/User')

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body

        if (firstName && lastName && email && password) {
            const checkUser = await User.findOne({ email })
            if (checkUser) {
                return res.status(200).redirect(`/register?error=Email already exists`)
            }
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            newUser = await User.create({ firstName, lastName, email, phone, password: hashPassword })
            const fetchUser = await User.findOne({ email })
            const { _id } = fetchUser
            const user = {
                id: _id, firstName, lastName, phone, email
            }
            const authtoken = jwt.sign(user, JWT_SECRET);
            return res.status(200).cookie('authtoken', authtoken).redirect(`/demo-custom/car-project?message=User Logged In Successfully...`)
        }
        else {
            console.log(req.body)
            return res.status(200).redirect(`/demo-custom/car-project/register?error=Fill all required fields`)
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(200).redirect(`/demo-custom/car-project/register?error=${err.message}`)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (email && password) {
            const checkUser = await User.findOne({ email })
            if (!checkUser) {
                return res.status(200).redirect(`/demo-custom/car-project/admin/login?error=Invalid Credentials`)
            }
            const checkPassword = await bcrypt.compare(password, checkUser.password)
            if (!checkPassword) {
                return res.status(200).redirect(`/demo-custom/car-project/admin/login?error=Invalid Credentials`)
            }
            const { _id } = checkUser
            const user = {
                id: _id, email
            }
            const authtoken = jwt.sign(user, JWT_SECRET);
            return res.status(200).cookie('authtoken', authtoken).redirect(`/demo-custom/car-project/admin?message=User Logged In Successfully...`)
        }
        else {
            console.log(req.body)
            return res.status(200).redirect(`/demo-custom/car-project/admin/login?error=Fill all required fields`)
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(200).redirect(`/demo-custom/car-project/admin/login?error=${err.message}`)
    }
})

router.get('/logout', (req,res)=> {
    res.clearCookie('authtoken'); // Default session cookie
    return res.status(200).redirect(`/demo-custom/car-project/admin/login`)
})

module.exports = router