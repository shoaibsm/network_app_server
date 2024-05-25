const router = require('express').Router()
const projectController = require('../controllers/project')
const requireUser = require('../middlewares/requireUser')

router.post('/createProject', requireUser, projectController.createProjectController)
router.get('/myProjects', requireUser, projectController.myProjects)

// for admin 
router.get('/allProjects', requireUser, projectController.getAllProjects)

// temp
// router.delete('/delAll', projectController.deleteAllProjects)

module.exports = router
