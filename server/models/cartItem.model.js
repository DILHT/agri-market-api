import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

export const CartItem = sequelize.define(
    "CartItem",
    {
        cartId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }
);


