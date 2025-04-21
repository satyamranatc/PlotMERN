import express from "express"
import cors from "cors"
import "dotenv/config"
import ConnectDB from "./Config/Db.js"
import LocationRoute from "./Router/locationRoute.js"
import PropertiesRoute from "./Router/propertiesRoute.js"
const app = express();


app.use(cors())
app.use(express.json())

ConnectDB()

app.use("/api/location",LocationRoute);
app.use("/api/properties",PropertiesRoute);



app.listen(process.env.PORT || 5500,()=>{
    console.log(`server Running on ${process.env.PORT}...`);
})