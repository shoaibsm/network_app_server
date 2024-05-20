const router = require('express').Router()
const authController = require('../controllers/auth')

router.post('/signup', authController.signupController)
router.post('/login', authController.loginController)
router.get('/refresh', authController.refreshAccessTokenController)
router.post('/logout', authController.logoutController)

module.exports = router