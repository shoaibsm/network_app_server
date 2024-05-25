const router = require('express').Router()
const userController = require('../controllers/user')
const requireUser = require('../middlewares/requireUser')

router.get('/getAllUser', requireUser, userController.getAllUser)
router.get('/getMyInfo', requireUser, userController.getMyInfo)
router.post('/update', requireUser, userController.updateUserProfile)

module.exports = router