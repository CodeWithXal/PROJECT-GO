require("dotenv").config;
const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const connectDB = require("./config/db.js");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req , res) =>{
    res.send("backend running");
})

const PORT = process.env.PORT;
app.listen(PORT,() => console.log(`server running on{$PORT}`));