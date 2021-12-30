const router = require('express').Router();
const {Post, Comment} = require('../../models');
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

router.delete('/:id', passport.authenticate('jwt'), async (req, res) => {
    let post = await Post.destroy({where: {id: req.params.id, uid: req.session.userId}});
    let comments = await Comment.destroy({where: {uid: req.params.id}});
    res.sendStatus(200);
})

module.exports = router;