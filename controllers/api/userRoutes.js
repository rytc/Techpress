const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {User, Post} = require('../../models')
const passport = require('passport');

router.post('/register', async (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, err => {
        if(err) { 
            console.log(err); 
        }
        res.sendStatus(200);
    })
})

router.post('/login', async (req, res) => {
    User.authenticate()(req.body.username, req.body.password, (err, user) => {
        if(err) {
            console.log(err)
        }

        
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json(user ? {
                username: user.username,
                token: jwt.sign({id: user.id}, process.env.SECRET)
            } : null)


        })

        
    })
})

module.exports = router