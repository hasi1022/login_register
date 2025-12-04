import sequelize from "../config/db.js";
import { DECIMAL, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import invoice from "./invoice.js";

const items=sequelize.define('items',{
    itemId:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true,
    },
    itemQuantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    itemName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    itemUnitPrice:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    itemSubUnitTotal:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    itemGst:{
        type:DataTypes.DECIMAL,
        allowNull:false
    }
})

export default items