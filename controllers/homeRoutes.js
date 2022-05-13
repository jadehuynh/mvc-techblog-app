const router = require('express').Router()
const { Comment, Post, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req,res) => {
    try {
        const postContent = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        })

        const posts = postContent.map((post) => post.get({ plain:true }));

      res.render('homepage',{
       posts,
       // logged_in: req.session.logged_in 
    })
    }catch (err) {
    res.status(500).json(err);
   }
  });

router.get('/comment', async (req,res) => {
    try {
        const postComment = await Comment.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
    
        const comments = commentData.get({ plain: true });
    
        res.render('comment', {
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
})

router.get('/comment/:id', async (req,res) => {
    
    res.render('comment', {
        posts,
        logged_in: req.session.logged_in, 
    })
})

// router.get('/dashboard', async (req,res) => {
//     try {
//         const projectComment = await Project.findByPk(req.params.id, {
//           include: [
//             {
//               model: User,
//               attributes: ['username'],
//             },
//           ],
//         });
    
//         const posts = postData.get({ plain: true });
    
//         res.render('dashboard', {
//           posts,
//           logged_in: req.session.logged_in
//         });
//       } catch (err) {
//         res.status(500).json(err);
//       }
// });

router.get('/posts', withAuth, async (req,res) => {
    try {
        const postContent = await Post.findByPk(req.session.user_id, {
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

router.get('/posts/:id', withAuth, async (req,res) => {
    
    res.render('posts', {
        posts,
        logged_in: req.session.logged_in, 
    })
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    res.render('login');
  });

  module.exports = router;