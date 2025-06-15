import express from "express";
import cors from "cors"
//import { fetchWeather } from ".config/api.js";
import dotenv from "dotenv";

import weatherRouter from "./routes/weatherRoutes.js"

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())


app.use("/weather", weatherRouter);

let PORT = process.env.PORT||8080;

app.listen(PORT, "localhost", () => {
    console.log(`app is running on port ${PORT}`)
})