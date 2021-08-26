const mongoose = require('mongoose');

const captchaSchema = new mongoose.Schema({
    guildID: { type: String },
    status: { type: String }
})

module.exports = mongoose.model('captcha-status', captchaSchema);
