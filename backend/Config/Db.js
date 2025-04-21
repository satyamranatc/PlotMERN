import mongoose from "mongoose";
import "dotenv/config"

export default function ConnectDB()
{

    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected To MongoDB.....");
    }).catch(()=>{
        console.log("Maf Karen");
    })
}