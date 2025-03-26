const API_BASE_URL = 'http://localhost:8000/api'; 
const apiKey = 'front_plus_back_warn_not';

const api = 'http://localhost:8000/static/product/';


async function getCategories() {
    try {
        // получение всех категорий
        const url = `${API_BASE_URL}/category/`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',  
            headers: {
              'X-API-Key': apiKey,  
              'Content-Type': 'application/json' 
            },
        });
        const categories = await response.json();
        displayCategories(categories); 
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        alert('Ошибка при получении категорий!');
    }
}

async function getProducts() {
    try {
        const url = `${API_BASE_URL}/product/`;
        const response = await fetch(url, {
            method: 'GET', 
            credentials: 'include', 
            headers: {
              'X-API-Key': apiKey,  
              'Content-Type': 'application/json' 
            },
        });
        const products = await response.json();
        displayProducts(products); 
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        alert('Ошибка при получении товаров');
    }
}

async function getProductDetails() {
    const productId = document.getElementById('productId').value;
    try {
        const url = `${API_BASE_URL}/product/${productId}`;
        const response = await fetch(url, {
            method: 'GET', 
            credentials: 'include', 
            headers: {
              'X-API-Key': apiKey,  
              'Content-Type': 'application/json' 
            },
        } );
        const product = await response.json();
        displayProductDetails(product); // Передаем данные в функцию отображения
    } catch (error) {
        console.error('Error getting product details:', error);
        alert('Failed to get product details');
    }
}

async function getProductsByCategory() {
    const categoryId = document.getElementById('categoryId').value;
    console.log(categoryId)
    try {
      const url = `${API_BASE_URL}/product/category/${categoryId}`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const products = await response.json();
      displayProductsByCategory(products);
    } catch (error) {
      console.error('Error getting products by category:', error);
      alert('Failed to get products by category');
    }
  }

// для отображения категорий
function displayCategories(categories) {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';

    categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.classList.add('category-item');

        // Блок названия
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('category-name');
        nameDiv.textContent = `${category.name}`;

        // Блок ID
        const idDiv = document.createElement('div');
        idDiv.classList.add('category-id');
        idDiv.textContent = `ID: ${category.id}`;

        // Блок описания
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('category-description');
        descriptionDiv.textContent = `Описание: ${category.description}`;
        
        // Блок картинки 
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('category-image');
        const image = document.createElement('img');
        image.src =  './static/test_static1.jpg'; //category.image
        image.alt = 'test';
        imageDiv.appendChild(image);

        listItem.appendChild(nameDiv);
        listItem.appendChild(idDiv);
        listItem.appendChild(descriptionDiv);
        listItem.appendChild(imageDiv);

        categoryList.appendChild(listItem);
    });
}

// для отображения все товаров
function displayProducts(products) {
    console.log(products)
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('product-item');


        // Блок названия
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('product-name');
        nameDiv.textContent = product.name;

         // Блок ID
        const idDiv = document.createElement('div');
        idDiv.classList.add('product-id');
        idDiv.textContent = `ID: ${product.id} наличие:${product.available}`;

        // Блок описания
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('product-description');
        descriptionDiv.textContent = product.description;

        // Блок цен
        const pricesDiv = document.createElement('div');
        pricesDiv.classList.add('product-prices');
        const pricesText = product.product_prices.map(p => `${p.price_type}: ${p.price} руб.`).join(', ');
        pricesDiv.textContent = `Цены: ${pricesText}`;

        const imagesDiv = document.createElement('div');
        imagesDiv.classList.add('product-images');

        if (product.product_images && product.product_images.length > 0) {
            product.product_images.forEach(image => {
                if (image.image_name) { // Проверяем наличие image_url
                    const imgElement = document.createElement('img');
                    imgElement.src = `${api}${image.image_name}`; // Используем динамический URL
                    imgElement.alt = product.name; // Или image.image_name
                    imgElement.classList.add('product-image');
                    imagesDiv.appendChild(imgElement);
                } else {
                    console.warn("Image URL is missing for product ID:", product.id);
                    imagesDiv.textContent = 'Нет изображений'; // Или что-то более информативное
                }
            });
        } else {
            imagesDiv.textContent = 'Нет изображений';
        }
        listItem.appendChild(nameDiv);
        listItem.appendChild(idDiv);
        listItem.appendChild(descriptionDiv);
        listItem.appendChild(pricesDiv);
        listItem.appendChild(imagesDiv);

        productList.appendChild(listItem);
       
    });
}
function displayProductsByCategory(products) {
    const productsByCategoryDiv = document.getElementById('productsByCategory');
    productsByCategoryDiv.innerHTML = ''; // Clear previous results

    if (products && products.length > 0) {
      const productList = document.createElement('ul');
      products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('product-item');


        // Блок названия
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('product-name');
        nameDiv.textContent = product.name;

         // Блок ID
        const idDiv = document.createElement('div');
        idDiv.classList.add('product-id');
        idDiv.textContent = `ID: ${product.id} наличие:${product.available}`;

        // Блок описания
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('product-description');
        descriptionDiv.textContent = product.description;

        // Блок цен
        const pricesDiv = document.createElement('div');
        pricesDiv.classList.add('product-prices');
        const pricesText = product.product_prices.map(p => `${p.price_type}: ${p.price} руб.`).join(', ');
        pricesDiv.textContent = `Цены: ${pricesText}`;

        const imagesDiv = document.createElement('div');
        imagesDiv.classList.add('product-images');

        if (product.product_images && product.product_images.length > 0) {
            product.product_images.forEach(image => {
                if (image.image_name) { // Проверяем наличие image_url
                    const imgElement = document.createElement('img');
                    imgElement.src = `${api}${image.image_name}`; // Используем динамический URL
                    imgElement.alt = product.name; // Или image.image_name
                    imgElement.classList.add('product-image');
                    imagesDiv.appendChild(imgElement);
                } else {
                    console.warn("Image URL is missing for product ID:", product.id);
                    imagesDiv.textContent = 'Нет изображений'; // Или что-то более информативное
                }
            });
        } else {
            imagesDiv.textContent = 'Нет изображений';
        }
        listItem.appendChild(nameDiv);
        listItem.appendChild(idDiv);
        listItem.appendChild(descriptionDiv);
        listItem.appendChild(pricesDiv);
        listItem.appendChild(imagesDiv);

        productList.appendChild(listItem);
      });
      productsByCategoryDiv.appendChild(productList);
    } else {
      productsByCategoryDiv.textContent = 'No products found in this category.';
    }
  }
  function displayProductDetails(product) {
    const productDetailDiv = document.getElementById('productDetail');
    productDetailDiv.innerHTML = '';

    if (product) {
        let detailsHTML = `<h3>${product.name}</h3>`;
        detailsHTML += `<p>${product.description}</p>`;
        detailsHTML += `<h4>Prices:</h4><ul>`;
        product.product_prices.forEach(price => {
            detailsHTML += `<li>${price.price_type}: ${price.price} ${price.rental_duration ? `(${price.rental_duration})` : ''} ${price.deposit ? `(Deposit: ${price.deposit})` : ''}</li>`;
        });
        detailsHTML += `<h4>Details:</h4><ul>`;
        product.product_details.forEach(detail => {
            detailsHTML += `<li>${detail.detail_name}: ${detail.detail_value}  </li>`;
        });
        detailsHTML += `</ul><h4>Images:</h4><ul>`;
        product.product_images.forEach(image => {
            if (image.image_name) { 
                detailsHTML += `<li><img src="${api}${image.image_name}" alt="${image.description}" style="max-width: 100px;"></li>`; // Используем динамический URL
            } else {
                console.warn("Image URL is missing for product detail image with description:", image.description);
                detailsHTML += `<li>No image available</li>`; // или что-то более информативное
            }
        });
        detailsHTML += `</ul>`;

        productDetailDiv.innerHTML = detailsHTML;
    } else {
        productDetailDiv.textContent = 'Product not found';
    }
}
   document.addEventListener('DOMContentLoaded', () => {
    const getCategoriesButton = document.getElementById('getCategoriesButton');
    const getProductsButton = document.getElementById('getProductsButton');
    const getProductDetailsButton = document.getElementById('getProductDetailsButton');
    const getProductByCategoryButton = document.getElementById('getProductByCategory');

    getProductByCategory

    getCategoriesButton.addEventListener('click', getCategories);
    getProductsButton.addEventListener('click', getProducts);
    getProductDetailsButton.addEventListener('click', getProductDetails);
    getProductByCategoryButton.addEventListener('click', getProductsByCategory);
});

