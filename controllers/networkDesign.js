const FiberNetworkDesign = require("../models/FiberNetworkDesign")
const User = require("../models/User")
const { error, success } = require("../utils/responseWrapper")

const fiberDesignController = async (req, res) => {
    try {
        const { polylineData, fiberLength, projectId } = req.body

        const owner = req._id

        const user = await User.findById(req._id)

        if (!user) {
            return res.send(error(404, 'User not found'))
        }

        if (!projectId) {
            return res.send(error(403, 'Project ID is required'))
        }

        const networkDesign = await FiberNetworkDesign.create({
            polylineData,
            project: projectId,
            owner: owner,
            fiberLength
        })

        // const networkDesign = await FiberNetworkDesign.findOneAndUpdate(
        //     { project: projectId, owner: owner },
        //     { $set: { polylineData, fiberLength } },
        //     { new: true, upsert: true }
        // )

        console.log(networkDesign);

        return res.send(success(200, { networkDesign }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const fetchPolylineData = async (req, res) => {
    try {
        // const { projectId } = req.body
        const { projectId } = req.params

        const userId = req._id

        if (!projectId) {
            return res.send(error(400, 'Project id is required'))
        }

        const networkDesign = await FiberNetworkDesign.findOne({ project: projectId, owner: userId })

        if (!networkDesign) {
            return res.send(error(404, 'No polyline data found for this project'))
        }

        return res.send(success(200, { networkDesign }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

module.exports = {
    fiberDesignController,
    fetchPolylineData
}