const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const { route } = require('./loginRoutes');

router.get('/', (req,res) => {
    User.findAll({
        attributes: {exclude: ["password"]}
    })
    .then(userData => {res.json(userData)})
    .catch(err => {res.status(500).json(err)})
});

router.post('/', async (req,res) => {
    try{
        const user = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        res.json(user)
    }catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.put('/:id', async (req,res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(err);
        }
});

router.delete('/:id', async (req, res) => {
    try { 
        const deletePost = await User.destroy({ where: {id : req.params.id}});
        res.status(200).json({message : `Deleted User`})
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;