const router = require('express').Router()
const JwtStrategy = require('passport-jwt/lib/strategy')
const { User, Post, Comment } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const helpers = require('../helpers')

router.get('/', async (req, res) => {
    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR"
    }

    let posts = await Post.findAll({
        raw:true, 
        include: [{model: User, attributes: ['username']}],
        order: [['createdAt', 'DESC']]
    
    })
    console.log(posts);
    viewData.posts = posts;

    res.render('index', viewData);
})

router.get('/login', async(req, res) => {

    if(req.session.loggedIn) {
        res.redirect('/dashboard')
    } else {
        let viewData = {
            isLoggedIn: req.session.loggedIn ? true : false,
            username: req.session.loggedIn ? req.session.username : "ERROR"

        }

        res.render('login', viewData);
    }
})

router.get('/register', async (req, res) => {
    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR"

    }

    res.render('register');
})

router.get('/dashboard', helpers.isLoggedIn, async (req, res) => {
    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR"
    }

    let posts = await Post.findAll({raw: true, where: {uid: req.session.userId}, order: [['createdAt', 'DESC']]});
    viewData.posts = posts;
    console.log(posts);

    res.render('dashboard', viewData)
});

router.get('/newpost', helpers.isLoggedIn, (req, res) => {
    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR"
    }

    res.render('newpost', viewData);
})

router.get('/editpost/:id', helpers.isLoggedIn, async (req, res) => {
    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR"
    }

    let post = await Post.findOne({raw: true, where: {id: req.params.id}});
    viewData.post = post;

    res.render('editpost', viewData);
})

router.get('/post/:id', async (req, res) => {
    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR"
    }

    let post = await Post.findOne({
        raw:true,
        include: [{model: User, attributes: ['username']}],
        where: {id: req.params.id}});
    viewData.post = post;

    let comments = await Comment.findAll({raw: true, where: {uid: req.params.id}});
    viewData.comments = comments;

    res.render('post', viewData);
})

router.get('/logout', async (req, res) => {
    if(req.session.loggedIn) {
        console.log("Logging out")
        req.session.destroy(() => {
            res.render('logout')
        })
    } else {
        console.log("Not logged in??")
        res.redirect('/');
    }
})


module.exports = router