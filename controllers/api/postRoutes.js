const router = require('express').Router();
const {Post} = require('../../models');
const passport = require('passport')

router.post('/', passport.authenticate("jwt"), async (req, res) => {
    console.log(req.body);
    
    let post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        uid: req.session.userId
    });
    res.json(post);
});

module.exports = router;