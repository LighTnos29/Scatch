const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const produtModel = require("../models/product-model")

router.post("/create", upload.single("image"), async (req, res) => {
try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
    let product = await produtModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,

    })
    req.flash("success","Product created succesfully.")
    res.redirect("/owners/admin")
} catch (error) {
    res.send(error.message)
    
}
})

module.exports = router