import 'dotenv/config'
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import { User } from "./models/user.js";
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.use(session({
    secret: 'Our Little Secret',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/Secret-Project")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error in connecting database:" + err.message));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let error = "";

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login', { error: error })
    error = ""
})

app.get('/secrets', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets")
    } else {
        res.redirect("/login")
    }
})

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.post('/register', (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
        });
    });
});


app.post('/login', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, (err) => {
        if (err) {
            error = err.message;
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets")
            })
        }
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})