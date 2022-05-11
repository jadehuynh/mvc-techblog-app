const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');

const userSeed = require('./userInfo.json');
const postSeed = require('./postContent.json');
const commentSeed = require('./commentContent.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postSeed, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentSeed, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();