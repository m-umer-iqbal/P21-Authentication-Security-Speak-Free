import 'dotenv/config'
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import { User } from "./models/user.js";
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/secretsDB")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error in connecting database:" + err.message));

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.create({ googleId: profile.id });
            }
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    })
);

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({ facebookId: profile.id });
            if (!user) {
                user = await User.create({ facebookId: profile.id });
            }
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }));

let error = "";

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile'],
        prompt: 'select_account' // <— this forces Google to show account chooser
    })
);

app.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/secrets');
    }
);

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect secrets page.
        res.redirect('/secrets');
    });

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login', { error: error })
    // error = ""
})

app.get('/secrets', async (req, res) => {
    if (req.isAuthenticated()) {
        const usersFound = await User.find({ "secrets": { $ne: null } });
        if (usersFound) {
            res.render("secrets", { usersWithSecrets: usersFound })
        }
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


app.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.render('login', { error: err.message });
        }
        if (!user) {
            return res.render('login', { error: 'Invalid username or password' });
        }
        req.login(user, (err) => {
            if (err) {
                return res.render('login', { error: err.message });
            }
            return res.redirect('/secrets');
        });
    })(req, res);
});

app.get('/submit', async (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit")
    } else {
        res.redirect("/login");
    }
});

app.post('/submit', async (req, res) => {
    const secret = req.body.secret;
    const userFound = await User.findById(req.user.id);
    if (userFound) {
        userFound.secrets.push({ secretContent: secret });
        await userFound.save();
        res.redirect("/secrets");
    } else {
        res.redirect("/login");
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})