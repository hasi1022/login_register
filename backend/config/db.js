import dotenv from "dotenv"
dotenv.config()
import {Sequelize} from "sequelize"
console.log(dotenv.config())

const sequelize=new Sequelize(process.env.DB_NAME1,process.env.DB_USER1,process.env.DB_PASS1,{
    host:process.env.DB_HOST1,
    port:Number(process.env.DB_PORT1),
    dialect:"postgres",
    sync:true
})
export default sequelize