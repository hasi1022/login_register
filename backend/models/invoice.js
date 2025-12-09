import { BIGINT, DataTypes } from "sequelize";
import Sequelize from "sequelize";
import sequelize from "../config/db.js";
import user from "./user.js";
import items from "./items.js";
const invoice=sequelize.define("invoice",{
     invoiceId:{
     type:DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true,
    },
    billTo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    invoiceDate:{
         type:DataTypes.DATE,
         defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
         allowNull:false
    },
    grandTotal:{
        type:DataTypes.DECIMAL,
    }
}
)

export default invoice