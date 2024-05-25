const router = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const projectRouter = require('./project')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/project', projectRouter)

module.exports = router