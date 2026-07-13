import app from "./app.js";
import  dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is runniing on port ${PORT}`);
    console.log("http://localhost:5000")
});

console.log("server started");