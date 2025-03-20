const { Category } = require('../models/models');
const ApiError = require('../error/ApiError')
class CategoryService {
    async getAllCategories(sequelize) {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name', 'description', 'image'], // Select only these fields
            });
            return categories;
        } catch (error) {
            throw ApiError.internal(`Failed to get products: ${error.message}`);        }
    }

    async getCategoryById(sequelize, id) {
        try {
            const category = await Category.findByPk(id, {
                attributes: ['id', 'name', 'description', 'image'],
            });
            if (!category) {
                throw ApiError.notFound(`Product with ID ${id} not found`);            }
            return category;
        } catch (error) {
            throw ApiError.internal(`Failed to get products: ${error.message}`);        }
    }
}

module.exports = new CategoryService();