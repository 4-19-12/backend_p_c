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
            name: 'Инструменты',
            description: 'Инструменты для воплощения ваших сладких идей',
            image: 'category_istrument_1.jpg',
        });
        console.log('Категория "Формы для выпечки" создана. ID:', category1.id);

        const category2 = await Category.create({
            name: 'Ингредиенты',
            description: 'Красители и ароматизаторы для кондитеров.',
            image: 'category_ingredients_1.jpg',
        });
         console.log('Категория "Ингредиенты" создана. ID:', category2.id);

         const category3 = await Category.create({
            name: 'Оборудование для аренды',
            description: 'Профессиональное оборудование для кондитерского производства в аренду: тестомесы, миксеры, тепловые шкафы и расстоечные камеры для вашего бизнеса.',
            image: 'category_prof_oborudovanie_1.jpg',
        });
         console.log('Категория "Оборудование для аренды" создана. ID:', category3.id);

//--------------------------------------------------------------------------

        console.log('Создаем тестовые продукты...');
        
        // product1
        const product1 = await Product.create({
            name: 'Набор пищевых чернил "CONFIPRINT" KREDA',
            description: 'В набор входит 4 пищевых чернил разного цвета. Отличный вариант нанесения индивидуальных изображений на десерты или повторения декора на больших партиях изделий',
            available: true,
            category_id: category2.id, 
        });

        await Product_image.create({
            product_id: product1.id,
            image_name: 'p13.jpg',
            is_main: true,
            description: 'Фотография набора чернил',
        });

        // детали 

        await Product_detail.create({
            product_id: product1.id,
            detail_name: 'Цвет',
            detail_value: 'Четыре цвета (Синий, Красный, Желтый, Черный)',
        });

        await Product_detail.create({
            product_id: product1.id,
            detail_name: 'Состав',
            detail_value: 'Вода, глицерин, пищевые красители (могут варьироваться в зависимости от цвета)',
        });
        

        await Product_detail.create({
            product_id: product1.id,
            detail_name: 'Упаковка',
            detail_value: 'Четыре картриджа по 10 мл каждый.',
        });
       

        await Product_detail.create({
            product_id: product1.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });
        

        await Product_price.create({
            product_id: product1.id,
            price_type: 'sale',
            price: 1800.00,
        });
        

       

        // product2
        const product2 = await Product.create({
            name: 'Пищевые блестки мелкой фракции Золотые, 5 гр',
            description: 'Применяется в украшение поверхности различных десертов. Представляет собой крупный порошок без постороннего вкусу и запаха.',
            available: true,
            category_id: category2.id, 
        });
     

        await Product_image.create({
            product_id: product2.id,
            image_name: 'p14.jpg',
            is_main: true,
            description: 'Фотография Пищевые блестки мелкой фракции Золотые',
        });
      

        // детали 

        await Product_detail.create({
            product_id: product2.id,
            detail_name: 'Цвет',
            detail_value: 'Золотой',
        });
     

        await Product_detail.create({
            product_id: product2.id,
            detail_name: 'Фракция',
            detail_value: 'Мелкая (для равномерного покрытия).',
        });
     

        await Product_detail.create({
            product_id: product2.id,
            detail_name: 'Состав',
            detail_value: 'Пищевой блеск на основе слюды.',
        });
       

        await Product_detail.create({
            product_id: product2.id,
            detail_name: 'Вес',
            detail_value: '5 гр.',
        });
       

        await Product_detail.create({
            product_id: product2.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });
       

        await Product_price.create({
            product_id: product2.id,
            price_type: 'sale',
            price: 120.00,
        });
      

       

        // product3
        const product3 = await Product.create({
            name: 'Набор пищевых красителей "ELECTRO promo" KREDA',
            description: 'В набор входит 8 гелевых красителей-концентратов S-gel с эффектом электро. Десерты с цветами электро произведут особое впечатление и запомнятся всем надолго!',
            available: true,
            category_id: category2.id, 
        });

        await Product_image.create({
            product_id: product3.id,
            image_name: 'p3.jpg',
            is_main: true,
            description: 'Фотография Набор пищевых красителей',
        });


        // детали 

        await Product_detail.create({
            product_id: product3.id,
            detail_name: 'Цвет',
            detail_value: '8 гелевых красителей-концентратов с эффектом электро - розовый, синий, зеленый, желтый, оранжевый, красный, изумрудный, фиолетовый.',
        });

        await Product_detail.create({
            product_id: product3.id,
            detail_name: 'Основа',
            detail_value: 'Гелевая (S-gel), краситель-концентрат водорастворимый',
        });

        await Product_detail.create({
            product_id: product3.id,
            detail_name: 'Упаковка',
            detail_value: '8 баночек по  5 гр',
        });

        await Product_detail.create({
            product_id: product3.id,
            detail_name: 'Вес',
            detail_value: '42 гр.',
        });

        await Product_detail.create({
            product_id: product3.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });

        await Product_price.create({
            product_id: product3.id,
            price_type: 'sale',
            price: 1000.00,
        });


        // product4
        const product4 = await Product.create({
            name: 'Набор фигурок сахарных Безе-мини белые, 30 г',
            description: 'Легкий, технологичный в использовании декор, можно легко применить как в масштабах производства, так и в домашних условиях для декорирования тортов, пирожных, десертов, капкейков',
            available: true,
            category_id: category2.id, 
        });

        await Product_image.create({
            product_id: product4.id,
            image_name: 'p4.jpg',
            is_main: true,
            description: 'Фотография Набор фигурок сахарных',
        });


        // детали 

        await Product_detail.create({
            product_id: product4.id,
            detail_name: 'Цвет',
            detail_value: 'Белый',
        });

        await Product_detail.create({
            product_id: product4.id,
            detail_name: 'Материал',
            detail_value: 'Сахар, яичный белок, пищевой краситель (диоксид титана).',
        });

        await Product_detail.create({
            product_id: product4.id,
            detail_name: 'Размер',
            detail_value: 'Мини, диаметр около 1 см.',
        });

        await Product_detail.create({
            product_id: product4.id,
            detail_name: 'Вес',
            detail_value: '30 гр.',
        });

        await Product_detail.create({
            product_id: product4.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });

        await Product_price.create({
            product_id: product4.id,
            price_type: 'sale',
            price: 100.00,
        });

        // product5
        const product5 = await Product.create({
            name: 'Силиконовая форма Диски D100 x H50',
            description: 'Эта силиконовая форма позволит вам создавать изысканные десерты в форме аккуратных дисков! Благодаря своим размерам (диаметр 100 мм, высота 50 мм) она идеально подходит для приготовления порционных десертов, тортов-цилиндров, муссовых пирожных и других кондитерских шедевров.',
            available: true,
            category_id: category1.id, 
        });

        await Product_image.create({
            product_id: product5.id,
            image_name: 'p5.jpg',
            is_main: true,
            description: 'Фотография Силиконовая форма Диски',
        });


        // детали 

        await Product_detail.create({
            product_id: product5.id,
            detail_name: 'Материал',
            detail_value: 'Силикон',
        });

        await Product_detail.create({
            product_id: product5.id,
            detail_name: 'Цвет',
            detail_value: 'Черный',
        });

        await Product_detail.create({
            product_id: product5.id,
            detail_name: 'Размер формы (мм)',
            detail_value: '330x220x50',
        });

        await Product_detail.create({
            product_id: product5.id,
            detail_name: 'Размер ячейки (мм)',
            detail_value: '100х50',
        });

        await Product_detail.create({
            product_id: product5.id,
            detail_name: 'Объем ячейки (мл)',
            detail_value: '425',
        });

        await Product_detail.create({
            product_id: product5.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });

        await Product_price.create({
            product_id: product5.id,
            price_type: 'sale',
            price: 2000.00,
        });


        // product6
        const product6 = await Product.create({
            name: 'Силиконовая форма «Пятнадцать сердец»',
            description: 'Создайте сразу пятнадцать очаровательных десертов в форме сердца с нашей удобной и гибкой силиконовой формой! Идеально подходит для приготовления порционных пирожных, желе, муссов и других сладостей.',
            available: true,
            category_id: category1.id, 
        });

        await Product_image.create({
            product_id: product6.id,
            image_name: 'p6.jpg',
            is_main: true,
            description: 'Фотография Силиконовая форма «Пятнадцать сердец»',
        });


        // детали 

        await Product_detail.create({
            product_id: product6.id,
            detail_name: 'Материал',
            detail_value: 'Силикон',
        });

        await Product_detail.create({
            product_id: product6.id,
            detail_name: 'Цвет',
            detail_value: 'Голубой',
        });

        await Product_detail.create({
            product_id: product6.id,
            detail_name: 'Размер формы (мм)',
            detail_value: '190x110x20',
        });

        await Product_detail.create({
            product_id: product6.id,
            detail_name: 'Форма ячейки ',
            detail_value: 'Сердце',
        });

        await Product_detail.create({
            product_id: product6.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });

        await Product_price.create({
            product_id: product6.id,
            price_type: 'sale',
            price: 300.00,
        });


        // product7
        const product7 = await Product.create({
            name: 'Насадка Закрытая Звезда 12 мм, высота 52 мм (Martellato)',
            description: 'Добавьте элегантности и профессионализма вашим десертам с насадкой “Закрытая Звезда” от Martellato! Изготовленная из высококачественной нержавеющей стали, она гарантирует четкий и ровный узор при создании звездочек, розеток, бордюров и других декоративных элементов. Страна производства: Республика Корея.',
            available: true,
            category_id: category1.id, 
        });

        await Product_image.create({
            product_id: product7.id,
            image_name: 'p7.jpg',
            is_main: true,
            description: 'Фотография Насадка Закрытая Звезда',
        });


        // детали 

        await Product_detail.create({
            product_id: product7.id,
            detail_name: 'Материал',
            detail_value: 'Нержавеющая сталь',
        });

        await Product_detail.create({
            product_id: product7.id,
            detail_name: 'Цвет',
            detail_value: 'Серебристый',
        });

        await Product_detail.create({
            product_id: product7.id,
            detail_name: 'Диаметр выходного отверстия',
            detail_value: '12 мм.',
        });

        await Product_detail.create({
            product_id: product7.id,
            detail_name: 'Высота',
            detail_value: '52 мм.',
        });

        await Product_detail.create({
            product_id: product7.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });

        await Product_price.create({
            product_id: product7.id,
            price_type: 'sale',
            price: 200.00,
        });

        // product8
        const product8 = await Product.create({
            name: 'Насадка Трубочка диаметр 10 мм',
            description: 'Эта классическая насадка-трубочка диаметром 10 мм идеально подходит для создания тонких линий, надписей, контуров и других изящных деталей на ваших десертах. Страна производства: Китай.',
            available: true,
            category_id: category1.id, 
        });

        await Product_image.create({
            product_id: product8.id,
            image_name: 'p8.jpg',
            is_main: true,
            description: 'Фотография Насадка Трубочка диаметр',
        });


        // детали 

        await Product_detail.create({
            product_id: product8.id,
            detail_name: 'Материал',
            detail_value: 'Коррозионностойкая сталь',
        });

        await Product_detail.create({
            product_id: product8.id,
            detail_name: 'Цвет',
            detail_value: 'Серебристый',
        });

        await Product_detail.create({
            product_id: product8.id,
            detail_name: 'Диаметр выходного отверстия',
            detail_value: '10 мм.',
        });

        await Product_detail.create({
            product_id: product8.id,
            detail_name: 'Единица измерения',
            detail_value: 'шт.',
        });

        await Product_price.create({
            product_id: product8.id,
            price_type: 'sale',
            price: 150.00,
        });



        // product9
        const product9 = await Product.create({
            name: 'Тестомес Fimar',
            description: 'Идеален для замеса дрожжевого, песочного, слоеного и других видов теста.',
            available: true,
            category_id: category3.id, 
        });

        await Product_image.create({
            product_id: product9.id,
            image_name: 'p9.jpg',
            is_main: true,
            description: 'Фотография Тестомес Fimar',
        });


        // детали 

        await Product_detail.create({
            product_id: product9.id,
            detail_name: 'Тип',
            detail_value: 'Спиральный, с несъемной дежей.',
        });

        await Product_detail.create({
            product_id: product9.id,
            detail_name: 'Материал',
            detail_value: 'Нержавеющая сталь (дежа, спираль)',
        });

        await Product_detail.create({
            product_id: product9.id,
            detail_name: 'Размер',
            detail_value: '700x400x800 мм.',
        });

        await Product_detail.create({
            product_id: product9.id,
            detail_name: 'Объем дежи',
            detail_value: '20 л.',
        });

        await Product_detail.create({
            product_id: product9.id,
            detail_name: 'Мощность',
            detail_value: '1,1 кВт.',
        });

        await Product_detail.create({
            product_id: product9.id,
            detail_name: 'Напряжение',
            detail_value: '220 В',
        });


        await Product_price.create({
            product_id: product9.id,
            price_type: 'rental',
            price: 1500.00,
            rental_duration:'day', 
            deposit: 30000, 
        });

        
        // product10
        const product10 = await Product.create({
            name: 'Миксер ручной Robot Coupe',
            description: 'Многофункциональный миксер для взбивания кремов, муссов, соусов, приготовления пюре.',
            available: true,
            category_id: category3.id, 
        });

        await Product_image.create({
            product_id: product10.id,
            image_name: 'p10.jpg',
            is_main: true,
            description: 'Фотография Миксер ручной Robot Coupe',
        });


        // детали 

        await Product_detail.create({
            product_id: product10.id,
            detail_name: 'Тип',
            detail_value: 'Ручной.',
        });

        await Product_detail.create({
            product_id: product10.id,
            detail_name: 'Материал',
            detail_value: 'Нержавеющая сталь (насадки), пластик (корпус).',
        });

        await Product_detail.create({
            product_id: product10.id,
            detail_name: 'Размер (длина)',
            detail_value: '500 мм',
        });

        await Product_detail.create({
            product_id: product10.id,
            detail_name: 'Количество скоростей',
            detail_value: '5',
        });

        await Product_detail.create({
            product_id: product10.id,
            detail_name: 'Мощность',
            detail_value: '220 Вт.',
        });

        await Product_detail.create({
            product_id: product10.id,
            detail_name: 'Напряжение',
            detail_value: '220 В',
        });


        await Product_price.create({
            product_id: product10.id,
            price_type: 'rental',
            price: 1000.00,
            rental_duration:'day', 
            deposit: 40000, 
        });



        // product11
        const product11 = await Product.create({
            name: 'Этюв мобильный тепловой шкаф Techinnov',
            description: 'Поддерживает оптимальную температуру и влажность для сохранения свежести готовых блюд и выпечки.',
            available: true,
            category_id: category3.id, 
        });

        await Product_image.create({
            product_id: product11.id,
            image_name: 'p11.jpg',
            is_main: true,
            description: 'Фотография Этюв мобильный тепловой шкаф Techinnov',
        });

        // детали 

        await Product_detail.create({
            product_id: product11.id,
            detail_name: 'Тип',
            detail_value: 'Мобильный, тепловой шкаф.',
        });

        await Product_detail.create({
            product_id: product11.id,
            detail_name: 'Материал',
            detail_value: 'Нержавеющая сталь (корпус), стекло (дверь).',
        });

        await Product_detail.create({
            product_id: product11.id,
            detail_name: 'Размер ',
            detail_value: '800x600x1800 мм',
        });

        await Product_detail.create({
            product_id: product11.id,
            detail_name: 'Количество полок',
            detail_value: '12',
        });
        await Product_detail.create({
            product_id: product11.id,
            detail_name: 'Температурный режим',
            detail_value: 'от +30°C до +90°C',
        });

        await Product_detail.create({
            product_id: product11.id,
            detail_name: 'Мощность',
            detail_value: '2 кВт.',
        });

        await Product_detail.create({
            product_id: product11.id,
            detail_name: 'Напряжение',
            detail_value: '220 В',
        });


        await Product_price.create({
            product_id: product11.id,
            price_type: 'rental',
            price: 3400.00,
            rental_duration:'day', 
            deposit: 50000, 
        });



        // product12
        const product12 = await Product.create({
            name: 'Шкаф расстоечный Unox XLT',
            description: 'Создает идеальные условия для подъема теста, обеспечивая равномерную расстойку и отличный результат.',
            available: true,
            category_id: category3.id, 
        });

        await Product_image.create({
            product_id: product12.id,
            image_name: 'p12.jpg',
            is_main: true,
            description: 'Фотография Шкаф расстоечный',
        });

        // детали 

        await Product_detail.create({
            product_id: product12.id,
            detail_name: 'Тип',
            detail_value: 'Расстоечный шкаф.',
        });

        await Product_detail.create({
            product_id: product12.id,
            detail_name: 'Материал',
            detail_value: 'Нержавеющая сталь (корпус)',
        });

        await Product_detail.create({
            product_id: product12.id,
            detail_name: 'Размер ',
            detail_value: '600x800x1900 мм',
        });

        await Product_detail.create({
            product_id: product12.id,
            detail_name: 'Количество уровней',
            detail_value: '8',
        });
        await Product_detail.create({
            product_id: product12.id,
            detail_name: 'Температурный режим',
            detail_value: 'от +20°C до +40°C',
        });

        await Product_detail.create({
            product_id: product12.id,
            detail_name: 'Мощность',
            detail_value: '2,5 кВт.',
        });

        await Product_detail.create({
            product_id: product12.id,
            detail_name: 'Напряжение',
            detail_value: '220 В',
        });


        await Product_price.create({
            product_id: product12.id,
            price_type: 'rental',
            price: 4000.00,
            rental_duration:'day', 
            deposit: 100000, 
        });

  

        console.log('Данные успешно добавлены в базу данных!');
    } catch (error) {
        console.error('Ошибка при добавлении тестовых данных:', error);
    } finally {
       
        await sequelize.close();
        console.log('Соединение с базой данных закрыто.');
    }
}

module.exports = insertTestData;