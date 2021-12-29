const Post = require('./Post.js')
const User = require('./User.js')

Post.belongsTo(User, {foreignKey: 'uid'})
User.hasMany(Post, {foreignKey: 'uid'})

module.exports = { Post, User}