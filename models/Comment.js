const {Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

class Comment extends Model {}

Comment.init({
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'comment'});

module.exports = Comment;