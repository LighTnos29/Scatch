const mongoose = require("mongoose")

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    photo: String,
    products: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model("owner",ownerSchema)