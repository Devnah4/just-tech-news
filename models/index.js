const User = require('./User');
const Post = require("./Post");

// creates the association between Post and User
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };