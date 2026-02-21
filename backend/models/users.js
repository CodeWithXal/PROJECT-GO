const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    clerkId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

userModel = mongoose.model("Users", userSchema);

module.exports = { userModel };
