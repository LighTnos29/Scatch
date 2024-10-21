const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const path = require("path")
const db = require("./config/mongooseConnection")
const usersRouter = require("./routes/usersRouter")
const ownersRouter = require("./routes/ownersRouter")
const productRouter = require("./routes/productRouter")
const index = require("./routes/index")
require("dotenv").config()
const expressSession = require("express-session")
const flash = require("connect-flash")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.use(flash())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use("/",index)
app.use("/users", usersRouter)            
app.use("/owners", ownersRouter)
app.use("/products", productRouter)

app.listen(3000)