const {projectModel} = require("../models/projects");

//create project function

async function createProject(req, res){
    const title = req.body.title;
    const description = req.body.description;
    const skillsRequired = req.body.skillsRequired;

    try{
        await projectModel.create({
            title,
            description,
            skillsRequired,
            createdBy : req.userId
        });

        res.json({
            message : "Project created Successfully"
        });
    }
    catch(err){
        res.json({
            message : "Error creating project",
            error : err.message
        });
    }
}


// get all my projects function

async function myProjects(req, res){
    const projects = await projectModel.find({createdBy : req.userId});

    if(!projects.length === 0){
        res.json({
            message : "No projects yet"
        });
    }
    else{
        res.json({
            projects
        });
    }
}



module.exports = {createProject, myProjects};