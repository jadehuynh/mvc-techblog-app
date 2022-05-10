const router = require('express').Router();
const login = require('./loginRoutes');
const posts = require('./postsRoutes');
const newPost = require('./newPostRoutes')


router.use('/login', loginRoutes);
router.use('/posts', postsRoutes);
router.use('/newPost', newPostRoutes);

module.exports = { router, login, posts, dashboard, newPost };
