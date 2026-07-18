import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 25,
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minlength:8,
        maxlength:256,

    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;