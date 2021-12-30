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

router.put('/:id', passport.authenticate("jwt"), async (req, res) => {
    let post = await Post.update({
        title: req.body.title,
        body: req.body.body},
        {where: {id: req.params.id}});
    res.json(post);
})

module.exports = router;