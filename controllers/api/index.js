const router = require('express').Router();
const login = require('./loginRoutes');
const posts = require('./postsRoutes');
const dashboard = require('./dashboardRoutes');
const comment = require('./commentRoutes')


router.use('/login', loginRoutes);
router.use('/posts', postsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comment', commentRoutes);

module.exports = { router, login, posts, dashboard, comment };
