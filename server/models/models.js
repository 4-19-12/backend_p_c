const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT }, 
    image: { type: DataTypes.STRING }, 
}, {
    timestamps: true, 
    underscored: true, 
});

const Product = sequelize.define('product', {  
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false }, 
    available: { type: DataTypes.BOOLEAN, defaultValue: true },  
}, {
    timestamps: true, 
    underscored: true, 
});
const Product_image = sequelize.define('product_image', { 
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image_name: { type: DataTypes.STRING, allowNull: false },
    is_main: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: { type: DataTypes.TEXT, allowNull: false },  
}, {
    timestamps: true, 
    underscored: true, 
});
const Product_detail = sequelize.define('product_detail', { 
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    detail_name: { type: DataTypes.STRING, allowNull: false },
    detail_value: { type: DataTypes.STRING },
}, {
    timestamps: true, 
    underscored: true, 
});
const Product_price = sequelize.define('product_price', {  
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    price_type: { type: DataTypes.ENUM('sale', 'rental'), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    rental_duration: { type: DataTypes.ENUM('day', 'week', 'month') }, 
    deposit: { type: DataTypes.DECIMAL(10, 2) }, 
}, {
    timestamps: true, 
    underscored: true, 
});

// Category - Product (One-to-Many)
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Product - Product_image (One-to-Many)
Product.hasMany(Product_image, { foreignKey: 'product_id' });
Product_image.belongsTo(Product, { foreignKey: 'product_id' });

// Product - Product_detail (One-to-Many)
Product.hasMany(Product_detail, { foreignKey: 'product_id' });
Product_detail.belongsTo(Product, { foreignKey: 'product_id'});

// Product - Product_price (One-to-Many)
Product.hasMany(Product_price, { foreignKey: 'product_id' });
Product_price.belongsTo(Product, { foreignKey: 'product_id' });




module.exports = {
     Category,Product, Product_detail, Product_image, Product_price
}