const {
    Product,
    Category,
    Product_image,
    Product_detail,
    Product_price,
} = require('./models'); 
const sequelize = require('../db')

async function insertTestData() {
    try {
        await sequelize.authenticate();
        console.log('Успешное подключение к базе данных!');
        await sequelize.sync({ force: true });
        console.log('База данных синхронизирована (таблицы созданы заново).');

        console.log('Создаем тестовые категории...');


        const category1 = await Category.create({
            name: 'Формы для выпечки',
            description: 'Широкий выбор форм для кексов, тортов и пирогов.',
            image: 'category_forms_1.jpg',
        });
        console.log('Категория "Формы для выпечки" создана. ID:', category1.id);

        const category2 = await Category.create({
            name: 'Ингредиенты',
            description: 'Красители и ароматизаторы для кондитеров.',
            image: 'category_ingredients_1.jpg',
        });
         console.log('Категория "Ингредиенты" создана. ID:', category2.id);

        console.log('Создаем тестовые продукты...');

        const product1 = await Product.create({
            name: 'Силиконовая форма "Сердце"',
            description: 'Форма для выпечки в виде сердца, идеально для романтических десертов.',
            available: true,
            category_id: category1.id, 
        });
        console.log('Продукт "Силиконовая форма "Сердце"" создан. ID:', product1.id);

        const product2 = await Product.create({
            name: 'Шоколадная посыпка',
            description: 'Мелкая шоколадная посыпка для украшения тортов и пирожных.',
            available: true,
            category_id: category2.id, 
        });
        console.log('Продукт "Шоколадная посыпка" создан. ID:', product2.id);


        console.log('Создаем изображения продуктов...');
        await Product_image.create({
            product_id: product1.id,
            image_name: 'url_to_product_image_1.jpg',
            is_main: true,
            description: 'Фотография силиконовой формы в виде сердца',
        });
        console.log('Изображение для "Силиконовой формы "Сердце"" создано.');

        await Product_image.create({
            product_id: product2.id,
            image_name: 'url_to_product_image_2.jpg',
            is_main: true,
            description: 'Фотография шоколадной посыпки',
        });
        console.log('Изображение для "Шоколадной посыпки" создано.');

        console.log('Создаем детали продуктов...');
        await Product_detail.create({
            product_id: product1.id,
            detail_name: 'Материал',
            detail_value: 'Силикон',
        });
        console.log('Деталь "Материал" для "Силиконовой формы "Сердце"" создана.');

        await Product_detail.create({
            product_id: product2.id,
            detail_name: 'Вес',
            detail_value: '100 г',
        });
        console.log('Деталь "Вес" для "Шоколадной посыпки" создана.');

    
        console.log('Создаем цены продуктов...');
        await Product_price.create({
            product_id: product1.id,
            price_type: 'sale',
            price: 250.00,
        });
         console.log('Цена продажи для "Силиконовой формы "Сердце"" создана.');

        await Product_price.create({
            product_id: product1.id,
            price_type: 'rental',
            price: 50.00,
            rental_duration: 'day',
            deposit: 100.00,
        });
        console.log('Цена аренды для "Силиконовой формы "Сердце"" создана.');

        await Product_price.create({
            product_id: product2.id,
            price_type: 'sale',
            price: 120.00,
        });
        console.log('Цена продажи для "Шоколадной посыпки" создана.');

        console.log('Тестовые данные успешно добавлены в базу данных!');
    } catch (error) {
        console.error('Ошибка при добавлении тестовых данных:', error);
    } finally {
       
        await sequelize.close();
        console.log('Соединение с базой данных закрыто.');
    }
}

module.exports = insertTestData;