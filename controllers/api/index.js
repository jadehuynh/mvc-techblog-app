const router = require('express').Router();
const login = require('./loginRoutes');
const posts = require('./postsRoutes');
const dashboard = require('../dashboardRoutes');
const comment = require('./commentRoutes')
const users = require('./userRoute')


router.use('/login', login);
router.use('/posts', posts);
router.use('/comment', comment);
router.use('/users', users)

module.exports = router;
