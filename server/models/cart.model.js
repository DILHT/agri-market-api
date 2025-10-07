import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";


export const Cart = sequelize.define(
    "Cart",
    {
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }

});



