const { includes } = require("zod");
const {projectModel} = require("../models/projects");

//create project function

async function createProject(req, res){
    let title = req.body.title;
    const description = req.body.description;
    const skillsRequired = req.body.skillsRequired;

    try{
        title = title.trim().toLowerCase();

        // check existing projects
        const existingProject = await projectModel.findOne({
            title,
            createdBy : req.userId
        });

        if(existingProject){
            return res.status(400).json({
                message : "Project with this title already exists"
            })
        }

        // creating new project

        const newProject = await projectModel.create({
            title,
            description,
            skillsRequired,
            createdBy : req.userId
        });

        res.json({
            message : "Project created Successfully",
            project : newProject
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

    if(projects.length === 0){
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

// join project function

async function joinProject(req, res){
    const projectId = req.params.projectId;
    const userId = req.userId;

    const project = await projectModel.findById(projectId);

    if(!project){
        return res.status(404).json({
            message : "project not found"
        });
    }

    //prevent duplicates

    if(project.members.includes(userId)){
        return res.json({
            message:"already joined"
        });
    }

    project.members.push(userId);
    await project.save();

    res.json({
        message : "project joined successfully"
    });
}

// show members function

async function showMembers(req, res){
    try{
        const project = await projectModel.findById(req.params.projectId);
        

        if(!project){
            return res.status(404).json({
                message : "Project Not Found"
            });
        }

        // authentication members should only be visible to 
        // creator or members of project
        const isCreator = project.createdBy.toString() === req.userId;
        const isMember = project.members.some(
            members => members.toString() === req.userId
        );

        if(!isCreator&&!isMember){
            return res.status(403).json({
                message : "You are not allowed to view members"
            });
        }

        // this shows the members 
        await project.populate("members","username email")
        await project.populate("createdBy","username");

        res.json({project});
    }
    catch(err){
        res.json({
            message : "Error fetching Project",
            error : err.message
        });
    }
}


module.exports = {createProject, myProjects, joinProject, showMembers};