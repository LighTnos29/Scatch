const express = require("express")
const router = express.Router()
const {registerUser, loginUser} = require("../controllers/authConroller")


router.get("/",(req,res)=>{
    res.render("/index")
})

router.post("/register",registerUser)
router.post("/login",loginUser)

module.exports = router