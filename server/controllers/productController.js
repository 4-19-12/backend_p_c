const uuid = require('uuid')
const path = require('path')
const fileUpload = require('express-fileupload');
const fileURLToPath = require('url');
const ApiError = require('../error/ApiError')
const productService = require('../services/productService')





class ProductController {
    async getAll(req, res, next) {
        try {
            const products = await productService.getAllProducts(req.sequelize);
            return res.json(products);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params;
        try {
            const product = await productService.getProductById(req.sequelize, id);
            return res.json(product);
        } catch (error) {
            console.error(error);
            return next(ApiError.notFound(error.message));
        }
    }
    async getProductsByCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;  

            if (!categoryId) {
                return next(ApiError.notFound(error.message));
            }

            const products = await productService.getProductsByCategory(req.sequelize, categoryId);

            res.json(products); 
        } catch (error) {
            console.error(error);
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new ProductController();