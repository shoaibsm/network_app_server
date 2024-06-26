const Project = require('../models/Project')
const User = require('../models/User')
const { success, error } = require('../utils/responseWrapper')

const createProjectController = async (req, res) => {
    try {

        const { title, desc, location } = req.body

        if (!title || !desc || !location) {

            return res.status(400).send(error(400, "All fields are required"))
        }

        const owner = req._id

        const user = await User.findById(req._id)

        const existingTitle = await Project.findOne({ title, owner })

        if (existingTitle) {
            return res.status(409).send(error(409, 'Please select different title'))
        }

        const project = await Project.create({
            title,
            desc,
            location,
            owner
        })

        user.projects.push(project._id)

        await user.save()

        return res.status(201).send(success(201, { project }))

    } catch (e) {
        return res.status(500).send(error(500, e.message))
    }
}

const myProjects = async (req, res) => {
    try {
        const userId = req._id

        if (!userId) {
            return res.send(404, 'User Id is erquired')
        }

        const projects = await Project.find({ owner: userId });

        if (!projects || projects.length === 0) {
            return res.status(400).send(error(400, 'No projects found!'));
        }
        projects.reverse()

        return res.status(200).send(success(200, { projects }));

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const getAllProjects = async (req, res) => {
    try {
        const userId = req._id

        if (!userId) {
            return res.send(error(404, 'User not found'))
        }

        const allProject = await Project.find()

        if (!allProject) {
            return res.send(error(404, 'All projects are required'))
        }

        return res.send(success(200, { allProject }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const updateProjectDetails = async (req, res) => {
    try {
        const { projectId, title, desc, location } = req.body

        const userId = req._id

        if (!userId) {
            return res.send(error(400, 'User not found'))
        }

        const project = await Project.findById(projectId)

        if (!project) {
            return res.send(error(404, 'project not found'))
        }

        if (project.owner.toString() !== userId) {
            return res.send(error(403, 'Only user can update this project'))
        }

        if (title) {
            project.title = title
        }

        if (desc) {
            project.desc = desc
        }

        if (location) {
            project.location = location
        }

        await project.save()

        return res.send(success(200, { project }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.body

        const userId = req._id

        if (!userId) {
            return res.send(error(400, 'User not found'))
        }

        const project = await Project.findById(projectId)

        if (!project) {
            return res.send(error(404, 'Project not found'))
        }

        if (project.owner.toString() !== userId) {
            return res.send(error(403, 'Only user can delete this project'))
        }

        await project.deleteOne()

        return res.send(success(200, 'project deleted successfully'))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

module.exports = {
    createProjectController,
    myProjects,
    getAllProjects,
    updateProjectDetails,
    deleteProject
}