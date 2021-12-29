const router = require('express').Router()
const JwtStrategy = require('passport-jwt/lib/strategy')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/', async (req, res) => {
    res.render('index')
})

router.get('/login', async(req, res) => {
    res.render('login')
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/logout', async (req, res) => {
    res.render('logout')
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});


module.exports = router