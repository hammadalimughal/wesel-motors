const mongoose = require('mongoose')
const { mongoURI } = require('./env.json')

mongoose.connect(mongoURI).then(() => {
    console.log(`Database Connected!`)
})