const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model{}
Blog.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            Type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'blog',
        }
);
module.exports = Blog;