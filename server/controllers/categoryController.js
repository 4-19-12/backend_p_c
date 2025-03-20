const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')
const categoryService = require('../services/categoryService')


class CategoryController {
    async getAll(req, res, next) {
        try {
            const categories = await categoryService.getAllCategories(req.sequelize);
            return res.json(categories);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params;
        try {
            const category = await categoryService.getCategoryById(req.sequelize, id);
            return res.json(category);
        } catch (error) {
            console.error(error);
            return next(ApiError.notFound(error.message));
        }
    }
}

module.exports = new CategoryController();