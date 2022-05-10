const router = require('express').Router()
const { Comment, Post, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req,res) => {
    // try {
    //     const postData = await Post.findAll({
    //         include: [
    //             {
    //                 model: Post,
    //                 attributes: ['title'],
    //             },
    //         ],
    //     }),
    // }

    //     const posts = postData.map((post) => post.get({ plain:true }));
   
        res.render('homepage', {
            logged_in: req.session.logged_in 
    });
});

router.get('/comment', async (req,res) => {
    try {
        // const projectData = await Comment.findByPk(req.params.id, {
        //   include: [
        //     {
        //       model: User,
        //       attributes: ['name'],
        //     },
        //   ],
        // });
    
        const comments = commentData.get({ plain: true });
    
        res.render('comment', {
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
})

router.get('/dashboard', async (req,res) => {
    try {
        // const projectData = await Project.findByPk(req.params.id, {
        //   include: [
        //     {
        //       model: User,
        //       attributes: ['name'],
        //     },
        //   ],
        // });
    
        const posts = postData.get({ plain: true });
    
        res.render('dashboard', {
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
})

router.get('/posts', withAuth, async (req,res) => {
    try {
        const postData = await Post.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: User}],
        });
    
        const user = userData.get({ plain: true });
    
        res.render('posts', {
          ...user,
          logged_in: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    res.render('login');
  });