import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

//creating the user model
const User = sequelize.define(
    'User',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },

        username:{
            type:DataTypes.STRING,
            allowNull:false
        },

        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },

        password:{
            type:DataTypes.STRING,
            allowNull:false
        },

        role:{
            type: DataTypes.ENUM("farmer","customer"),
            defaultValue:"customer"
        },
    },

    {
        tableName:"users",
        timestamps:true,
    }
)

export default User;
