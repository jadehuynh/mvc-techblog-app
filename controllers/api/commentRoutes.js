const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const comment = await Comment.create({
            text: req.body.contents, 
            user_id: req.session.user_id, 
            post_id: req.body.post_id
        })
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;