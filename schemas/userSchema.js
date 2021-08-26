const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
userId: {
type: String,
required: true
}

})

module.exports = mongoose.model('blacklisted-info', userSchema)
