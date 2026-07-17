import app from "./app.js";
import  dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer(){
    try{
        await connectDB();

        app.listen(PORT, () => {
            console.log(`
                =========================================
                # PROJECT GO Backend Started

                Environment : development
                Database    : Connected
                Server      : http://localhost:${PORT}
                =========================================
                `)});
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }

    
}

startServer();


