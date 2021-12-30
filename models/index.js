const Post = require('./Post.js')
const User = require('./User.js')
const Comment = require('./Comment.js')

Post.belongsTo(User, {foreignKey: 'uid'})
User.hasMany(Post, {foreignKey: 'uid'})

Comment.belongsTo(Post, {foreignKey: 'uid'});
Post.hasMany(Comment, {foreignKey: 'uid'});


module.exports = { Post, User, Comment}