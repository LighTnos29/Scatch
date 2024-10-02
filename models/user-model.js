const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,    
    photo: String,

})

module.exports = mongoose.model("user",userSchema)