
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./aap.js";

dotenv.config({
    path : '.env'
})

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8080 , () =>{
        console.log(`Server is running at Port : ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("Mongo DB connection Failed ", err);
})







/* 

 import express from "express"
const app = express()

(async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("errror", (error) => {
        console.log("ERRR", error);
        throw error
       })
       app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
        
       })

    }catch(error){
        console.error("Error", error);
        throw err
    }
}) () 
    
*/