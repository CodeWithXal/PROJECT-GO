const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      console.error("MONGO_URI not defined in .env");
    }
    await mongoose.connect(MONGO_URI);
    console.log("mongoDB  connected successfully");
  } catch (e) {
    console.error("error connecting to mongoDB", e);
    process.exit(1);
  }
};

module.exports = connectDB;
