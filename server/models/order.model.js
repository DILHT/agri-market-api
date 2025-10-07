import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";


export const Order = sequelize.define(
    "Order",
    {
        totalAmount:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false,    
            defaultValue:'Pending'
        }
    }
);

