const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const connectToDatabase = require('../middleware/connectToDB')




router.get('/', connectToDatabase,  productController.getAll )
router.get('/:id',connectToDatabase, productController.getOne )
router.get('/category/:categoryId', connectToDatabase,  productController.getProductsByCategory);



module.exports = router