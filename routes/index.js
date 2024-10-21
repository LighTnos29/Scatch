const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const router = express.Router()


router.get("/", (req, res) => {
    let error = req.flash("error")
    res.render("index", { error, loggedIn: false })
})

router.get("/shop", isLoggedIn, async (req, res) => {
    let products = await productModel.find()
    res.render("shop", { products })
})
router.get("/logout", isLoggedIn, (req, res) => {
    res.cookie("token", "")
    req.flash("error", "You have successfully logged out.");
    res.redirect("/");
})

module.exports = router