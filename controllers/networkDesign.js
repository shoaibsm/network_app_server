const { default: mongoose } = require("mongoose")
const FiberRoute = require("../models/FiberRoute")
const Project = require("../models/Project")
const { error, success } = require("../utils/responseWrapper")


const saveFiberController = async (req, res) => {
    try {
        const { paths, totalDistance, projectId } = req.body;
        const userId = req._id;

        if (!userId) {
            return res.send(error(400, 'User not found'));
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.send(error(404, 'Project not found'));
        }

        if (project.owner.toString() !== userId.toString()) {
            return res.send(error(403, 'Only the owner can add or update routes for this project'));
        }

        let fiberRoute = await FiberRoute.findOne({ projectId });

        if (fiberRoute) {
            // Update existing FiberRoute
            fiberRoute.paths = paths;
            fiberRoute.totalDistance = totalDistance;
            fiberRoute.userId = userId;

            await fiberRoute.save();
            return res.send(success(200, { fiberRoute, message: 'Fiber route updated successfully' }));
        } else {
            // Create a new FiberRoute
            fiberRoute = new FiberRoute({
                paths,
                totalDistance,
                projectId,
                userId
            });

            await fiberRoute.save();
            return res.send(success(200, { fiberRoute, message: 'Fiber route created successfully' }));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }
}

const getFiberPathsController = async (req, res) => {
    try {
        const { projectId } = req.params;

        const fiberRoutes = await FiberRoute.findOne({ projectId });

        if (!fiberRoutes || fiberRoutes.length === 0) {

            return res.send(error(404, 'No fiber routes found for this project'));

        }

        return res.send(success(200, { fiberRoutes }));

    } catch (e) {
        return res.send(error(500, e.message));
    }
}

module.exports = {
    saveFiberController,
    getFiberPathsController
}