const { error, success } = require("../utils/responseWrapper")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')

const signupController = async (req, res) => {
    try {
        const { name, email, password, userImg } = req.body

        if (!name || !email || !password) {
            return res.send(error(400, 'All fields are required'))
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.send(error(409, 'User already registered'))
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let cloudImgUrl = ''

        if (userImg) {
            try {
                const cloudImg = await cloudinary.uploader.upload(userImg, {
                    folder: 'cablesmith User'
                })

                cloudImgUrl = cloudImg.secure_url

            } catch (error) {
                console.log(error);
            }
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar: {
                url: cloudImgUrl
            }
        })

        await newUser.save()

        return res.send(success(201, { newUser }))


    } catch (e) {
        console.log(e);
        return res.send(500, e.message)
    }

    // return res.send('ok from signup controller')
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.send(error(400, 'All feilds are required'))
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.send(error(404, "User not found"))
        }

        const matchedPassword = await bcrypt.compare(password, user.password)

        if (!matchedPassword) {

            return res.send(error(403, 'Incorrect password'))
        }

        const accessToken = generateAccessToken({ _id: user._id })

        const refreshToken = generateRefreshToken({ _id: user._id })

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return res.send(success(200, {
            accessToken,
            // refreshToken
        }))
    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const logoutController = async (req, res) => {
    try {

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true
        })

        return res.send(success(200, 'User logged out'))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

// Refresh Access Token 

const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies

    if (!cookies || !cookies.jwt) {
        return res.send(error(401, 'RefreshToken in cookie is required'))
    }

    const refreshToken = cookies.jwt

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY)

        const _id = decoded._id

        const accessToken = generateAccessToken({ _id })

        return res.send(success(201, { accessToken }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}

// internal operation for access token

const generateAccessToken = (data) => {
    try {
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '1d'
        })

        return accessToken;

    } catch (error) {
        console.log(error);
    }
}

const generateRefreshToken = (data) => {
    try {
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y'
        })

        return refreshToken

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signupController,
    loginController,
    refreshAccessTokenController,
    logoutController
}