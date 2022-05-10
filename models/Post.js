const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model {

}

Post.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
               len: [0,25]
            }
        },
        body:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "user",
                key: "id",
            }
        }
    },
    {
        sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
    }
)

module.exports = Post;