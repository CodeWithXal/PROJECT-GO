const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        default : ""
    },
    skillsRequired : {
        type : [String],
        default : [],
        required : true
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps : true});

projectSchema.index({title:1, createdBy:1},{unique:true});

const projectModel = mongoose.model("projects",projectSchema) 
module.exports = {projectModel};