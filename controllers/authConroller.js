const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const generateToken = require("../utlis/generateToken")


module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body

    let user = await userModel.findOne({ email })
    if (user) return res.status(401).send("You already have an account , Please login.")

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message)
        else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          })
          let token = generateToken(user)
          res.cookie("token", token)
          res.redirect("/shop")
        }
      });
    });


  } catch (error) {
    console.log(error.message);

  }
}

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body
  let user = await userModel.findOne({ email })
  if (!email) return res.send("Email or password incorrect.")
  bcrypt.compare(password, user.password , function (err, result) {
    if(result){
      let token = generateToken(user)
      res.cookie("token",token)
      res.redirect("/shop")
    }
    else{
      res.send("Email or password incorrect.")
    }
  });

}