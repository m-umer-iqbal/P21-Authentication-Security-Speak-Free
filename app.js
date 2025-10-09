import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import { User } from "./models/user.js";

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set('view engine', 'ejs');

try {
    const connect = await mongoose.connect("mongodb://localhost:27017/Secret-Project")
} catch (err) {
    console.log("Error in connecting database:" + err.message)
}

let error = "";

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login', { error: error })
    error = ""
})

app.get('/register', (req, res) => {
    res.render('register', { error: error })
    error = ""
})

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        await newUser.save();
        res.render("secrets")
    } catch (err) {
        res.render("error", { error: err.message })
    }
})

app.post('/login', async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.username })
    if (foundUser) {
        if (foundUser.password === req.body.password) {
            res.render("secrets")
        } else {
            error = "Invalid Password";
            res.redirect("/login");
        }
    } else {
        error = "Invalid Username";
        res.redirect("/login");
    }
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})