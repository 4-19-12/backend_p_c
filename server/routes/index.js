const Router = require('express')
const router = new Router()


const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const mailRouter = require('./mailRouter')





router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/mail',mailRouter )
module.exports = router