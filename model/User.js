const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uid:{
        type: Number,
        unique: true,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("user", userSchema)