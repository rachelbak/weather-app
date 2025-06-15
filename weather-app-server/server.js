import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import weatherRouter from "./routes/weatherRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())


app.use("/weather", weatherRouter);

app.use("*", (req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

app.listen(PORT, "localhost", () => {
    console.log(`Weather server running on port ${PORT}`)
})





