const products = [
    {id: 1, title: 'Notebook', price: 2000, photo: 'notebook.jpg'},
    {id: 2, title: 'Mouse', price: 20,photo: 'mouse.png' },
    {id: 3, title: 'Keyboard', price: 200, photo:'keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50 ,photo:'gamepad.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title = 'Notebook', price ='2000', photo ='notebook.jpg') => {
    return `<div class="product-item">
               <img class="product-item-photo" src="./img/${photo}" alt="photo">
                <h3 class="product-item-header">${title}</h3>
                <p class="product-item-price">${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title,item.price, item.photo));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};
// map возвращает нам новый массив, а innerHTML преобразует в строку. поэтому нужно добавить join('')
renderPage(products);