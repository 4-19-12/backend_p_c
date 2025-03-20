const { Product, Product_image, Product_price, Product_detail } = require('../models/models');
const ApiError = require('../error/ApiError')
const { Sequelize } = require('sequelize');

class ProductService {
    async getAllProducts(sequelize) {
        try {
            
            const products = await Product.findAll({
                attributes: ['id', 'name', 'description', 'available'],
                include: [
                    {
                        model: Product_price,
                        attributes: ['price_type', 'price'],
                    },
                    {
                        model: Product_image,
                        attributes: ['image_name'],
                        where: { is_main: true }, 
                        required: false, 
                        limit: 1,      
                    }
                ],
            });
            return products;
        } catch (error) {
            throw ApiError.internal(`Failed to get products: ${error.message}`);
        }
    }

    async getProductById(sequelize, id) {
        try {
            
            const product = await Product.findByPk(id, {
                include: [
                    {
                        model: Product_price,
                        attributes: ['price_type', 'price', 'rental_duration', 'deposit'],
                    },
                    {
                        model: Product_image,
                        attributes: ['image_name', 'is_main', 'description'],
                    },
                    {
                        model: Product_detail,
                        attributes: ['detail_name', 'detail_value'],
                    },
                ],
            });

            if (!product) {
                throw ApiError.notFound(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            if (error instanceof Sequelize.ValidationError) {
                // Обработка ошибок валидации Sequelize
                throw ApiError.badRequest(`Validation error: ${error.message}`);
              } else if (error instanceof Sequelize.DatabaseError) {
                // Обработка ошибок базы данных Sequelize
                throw ApiError.internal(`Database error: ${error.message}`);
              }
                throw ApiError.internal(`Failed to get product with ID ${id}: ${error.message}`);
            }
        
        
    }
    async getProductsByCategory(sequelize, categoryId) {
        try {
            
            const products = await Product.findAll({
                where: { category_id: categoryId },
                include: [
                    {
                        model: Product_price,
                        attributes: ['price_type', 'price', 'rental_duration', 'deposit'],
                    },
                    {
                        model: Product_image,
                        attributes: ['image_name', 'is_main', 'description'],
                    },
                    {
                        model: Product_detail,
                        attributes: ['detail_name', 'detail_value'],
                    },
                ],
            });

            if (!products || products.length === 0) {
                return []; 
            }

            return products;
        } catch (error) {
            throw ApiError.internal(`Failed to get products by category: ${error.message}`);
        }
    }
}

module.exports = new ProductService();