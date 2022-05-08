const router = require('express').Router();
const login = require('./loginRoutes');
const posts = require('./postsRoutes');
const dashboard = require('./dashboardRoutes');


router.use('/login', loginRoutes);
router.use('/posts', postsRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = { router, login, posts, dashboard };
