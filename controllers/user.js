const User = require("../models/User")
const { error, success } = require("../utils/responseWrapper")
const cloudinary = require('cloudinary').v2

const getMyInfo = async (req, res) => {
    try {
        const _id = req._id

        const user = await User.findById({ _id }).populate('projects')

        if (!user) {
            return res.send(error(404, 'User not found'))
        }

        return res.send(success(200, { user }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}


const getAllUser = async (req, res) => {
    try {

        const users = await User.find()

        if (!users) {
            return res.send(error(404, "users not found"))
        }

        return res.send(success(200, { users }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { name, userImg } = req.body

        const user = await User.findById(req._id)

        if (name) {
            user.name = name
        }

        if (userImg) {
            const cloudImg = await cloudinary.uploader.upload(userImg, {
                folder: 'cablesmith User'
            })

            user.avatar = {
                url: cloudImg.secur.url
            }
        }

        await user.save();

        return res.send(success(200, 'User updated'))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

module.exports = {
    getAllUser,
    getMyInfo,
    updateUserProfile,
}