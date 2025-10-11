import 'dotenv/config'
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import { User } from "./models/user.js";
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

const saltRounds = parseInt(process.env.SALT_ROUNDS);

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

app.get('/logout', (req, res) => {
    res.redirect('/')
})

app.post('/register', async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            const newUser = new User({
                email: req.body.username,
                password: hash
            });
            await newUser.save();
            res.render("secrets")
        });
    } catch (err) {
        res.render("error", { error: err.message })
    }
})

app.post('/login', async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.username })
    if (foundUser) {
        bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
            if (result === true) {
                res.render("secrets")
            } else {
                error = "Invalid Password";
                res.redirect("/login");
            }
        });
    } else {
        error = "Invalid Username";
        res.redirect("/login");
    }
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})