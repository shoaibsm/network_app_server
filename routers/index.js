const router = require('express').Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const projectRouter = require('./project')
const networkDesignRouter = require('./networkDesign')
const networkRouter = require('./networkDesign')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/project', projectRouter)
// router.use('/network', networkDesignRouter)
router.use('/network', networkRouter)

module.exports = router