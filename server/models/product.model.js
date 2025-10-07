import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js'; 

const Product = sequelize.define(
    'Product', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
        // imageUrl:{
        //     type: DataTypes.STRING,
        //     allowNull:true
        // }
}, {
    tableName: 'products'
});

export default Product;
