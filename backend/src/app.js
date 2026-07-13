import express from "express";
import healthRouter from "./routes/health.routes.js"


const app = express();


app.use(express.json());

app.use("/api/v1/", healthRouter);


// middleware will go here 

// routes will go here

export default  app;