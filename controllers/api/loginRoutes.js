const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const checkUser = await User.findOne({ where: {username:  req.body.username}});

    if (!checkUser) {
      res.status(400).json({ message: 'Incorrect username, please try again' });
      return;
    }

    const correctPassword = await checkUser.checkPassword(req.body.password);
 
    if (!correctPassword) {
      res.status(401).json({ message: 'Incorrect password, please try again' });
      return;
    }
      req.session.save(() => {
      req.session.user_id = checkUser.id;
      req.session.logged_in = true;
      
      res.json({ user: checkUser, message: 'You are logged in'})
    });
  } catch (error) {
    res.status(500).json({error: error, message: 'Something went wrong.'});
    console.log(error)
  }
});

router.post('/signup', async (req, res) => {
  console.log("hitting signup",req.body)
  try {
    const userData = await User.create(req.body);
    console.log(userData);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {

      req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;