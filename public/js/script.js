//search form-- searching through for services
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}

/**
 * adding items to cart
 * removing items
 * proceeding with payment
 */
let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
}





// class Fruits {
//     constructor(name, price, quantity){
//         this.name = name; //type string
//         this.price = price; //type float
//         this.quantity = quantity; //type integer
//     }

// }