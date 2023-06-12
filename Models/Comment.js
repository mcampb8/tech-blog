const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    text:{
        type: DataTypes.STRING,
        allownull: false,
    },
    commenter: {
        type: DataTypes.STRING,
        allownull: false
    },
    date_created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'blog',
          key: 'id',
        },
      },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    })

module.exports = Comment;