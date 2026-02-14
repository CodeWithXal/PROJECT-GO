require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const {authRouter} = require("./routes/auth")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter)
app.get("/", (req , res) =>{
    res.send("backend running");
})

const PORT = process.env.PORT;

const startServer = async () =>{
    try{
        await connectDB();

            app.listen(PORT,() => console.log(`server running on http://127.0.0.1:${PORT}`));

    }
    catch(err){
        console.error("Failed to start the server",err);
    }
}

startServer();
