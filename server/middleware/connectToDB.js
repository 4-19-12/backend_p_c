const ApiError = require('../error/ApiError');
const sequelize = require('../db');


module.exports = async function connectToDatabase(req, res, next) {
    try {
        if (!sequelize || !sequelize.options) {  
            console.error('Database connection is not initialized.');
            return next(ApiError.internal('Database connection is not initialized')); 
        }
        await sequelize.authenticate();
        req.sequelize = sequelize;
        await sequelize.sync(); 
        console.log("Connection open, sync ok");
        next();
    } catch (error) {
      console.error('Database connection error:', error);
      return next(ApiError.internal('Database connection error'));
    }
}