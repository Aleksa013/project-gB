const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = [...data];
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class BasketProductList{
    constructor(container = '.basket'){
        this.container = container;
        this.goodsBasket = [];
        this._getProductsBasket()
            .then(data => {
                 this.goodsBasket = data.contents;
                 this.render()
            });
        // this.showBasket();
        }
    _getProductsBasket(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    // showBasket(){
    //     document.querySelector('.btn-cart').addEventListener('click',() =>{
    //         document.querySelector(this.container).classList.remove("invisibility");
    //     })
   
    // }
     render(){
    const blockBasket = document.querySelector(this.container);
    for (let item of this.goodsBasket){
        const productObj = new ProductItemBasket(item);
        blockBasket.insertAdjacentHTML('beforeend', productObj.render());
    }
}
}
class ProductItemBasket {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        
        return `<div class="basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc-basket">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                    <button class="del-btn">Удалить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();


document.querySelector(".btn-cart").addEventListener('click',() =>{
    new BasketProductList;
   document.querySelector('.basket').classList.remove("invisibility");
})
