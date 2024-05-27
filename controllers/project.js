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

// const deleteAllProjects = async (req, res) => {
//     try {

//         // const allProjects = await Project.deleteMany()
//         const allProjects = await Project.find()

//         if (!allProjects || allProjects.length === 0) {
//             return res.send(error(404, 'no projects found'))
//         }

//         return res.send(success(200, { allProjects }))

//     } catch (e) {
//         return res.send(error(500, e.message))
//     }
// }

module.exports = {
    createProjectController,
    myProjects,
    getAllProjects
    // deleteAllProjects
}