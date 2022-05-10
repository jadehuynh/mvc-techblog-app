const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
    try{
        const postedContent = await Post.findAll({
            include: [
                {
                model: Comment,
                include: [
                    {
                        model: User
                    }
                ]
            }
        ]
        })
            const posts = postedContent.map((post) => post.get({ plain: true }));
            res.status(200).json({ posts });
    }catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                model: Comment,
                include: [
                    {
                        model: User
                    }
                ]
            }
        ]
        });
        const onePost = post.get({ plain: true });
            res.status(200).json({onePost})
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            contents: req.body.body,
            user_id: req.session.user_id 
        });
        res.status(200).json({post, message : `Post is Created`})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where : {
                id: req.params.id
            }
        }); 
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try { 
        const deletePost = await Post.destroy({ where: {id : req.params.id}});
        res.status(200).json({message : `Deleted Post ${deletePost}`})
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;