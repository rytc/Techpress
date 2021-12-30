const router = require('express').Router();
const {Comment} = require('../../models');
const passport = require('passport')

router.post('/:id', passport.authenticate("jwt"), async (req, res) => {
    console.log(req.body);
    
    let comment = await Comment.create({
        body: req.body.body,
        username: req.session.username,
        uid: req.params.id,
    });
    res.json(comment);
});

module.exports = router;