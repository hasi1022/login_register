import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"
const user=sequelize.define("user",{
      user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      user_name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      email:{
         type:DataTypes.STRING,
         allowNull:false 
      },
      password:{
         type:DataTypes.STRING,
         allowNull:false,
      }
})
export default user