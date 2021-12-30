require("dotenv").config()

const express = require("express")
const session = require("express-session")
const path = require("path")
const sequelize = require('./config/config.js')
const passport = require('passport')
const {User, Post} = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const hbs = require('express-handlebars').engine();
const app = express()

app.use(session({ secret: process.env.SECRET, maxAge:60*60&1000, resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60*60*1000 } })); // Auto logout after an hour
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', hbs);
app.set('view engine', 'handlebars')
app.set('views', './views')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, async function ({ id }, cb) {
  try {
    const user = await User.findOne({ where: { id }, include: [Post] })
    cb(null, user)
  } catch (err) {
    cb(err, null)
  }
}))

app.use(require("./controllers"))

async function init() {
    await sequelize.sync();
    app.listen(process.env.PORT || 3000);
}

init()