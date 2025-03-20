const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const connectToDatabase = require('../middleware/connectToDB')

router.get('/',connectToDatabase,  categoryController.getAll)


module.exports = router