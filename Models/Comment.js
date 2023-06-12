const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    text:{
        type: DataTypes.STRING,
        allownull: false,
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    })

module.exports = Comment;