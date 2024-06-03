const router = require('express').Router()
const networkDesign = require('../controllers/networkDesign')
const requireUser = require('../middlewares/requireUser')

router.post('/fiber-design', requireUser, networkDesign.fiberDesignController)
// router.post('/fetch-polyline/:projectId', requireUser, networkDesign.fetchPolylineData)
router.get('/fetch-polyline/:projectId', requireUser, networkDesign.fetchPolylineData)

module.exports = router