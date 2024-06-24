const requireUser = require('../middlewares/requireUser')
const networkDesignController = require('../controllers/networkDesign')

const router = require('express').Router()

router.post('/save-fiber', requireUser, networkDesignController.saveFiberController)
router.get('/get-fiberPath/:projectId', requireUser, networkDesignController.getFiberController)

module.exports = router