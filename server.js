const dotenv = require("dotenv")
const express = require("express")
const path = require("path")
const sequelize = require('./config/config.js')
const passport = require('passport')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const {User, Post} = require('./models')

const hbs = require('express-handlebars').engine();
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', hbs);
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(passport.initialize())
app.use(passport.session())

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


app.listen(process.env.PORT || 3000, () => {
    sequelize.sync();
})