import { menuArray } from "./data.js";

const main_content = document.getElementById('main');
const order_info = document.getElementById('order');
const modal = document.getElementById('modal');
const place_order_btn = document.getElementById('place-order-btn');
const order_message = document.getElementById('order-message');
const fullName = document.getElementById('full-name');
const closeModalBtn = document.getElementById('close-modal-btn');

place_order_btn.addEventListener('click', placeOrder);
closeModalBtn.addEventListener('click', closeModal);

console.log('test');
console.log(menuArray);

document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        handleAddClick(e.target.dataset.add);
    } else
    if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove);
    }
})

let orders = [];

function closeModal() {
    modal.style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('cvvNumber').value = '';
}

function placeOrder(e) {
    e.preventDefault();
    const name = document.getElementById('name').value ;
    // Reset inputs to empty strings
    document.getElementById('name').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('cvvNumber').value = '';
    order_message.style.display = 'block';
    
    fullName.innerText = name ;
    order_info.style.display = 'none';
    modal.style.display = 'none';

    setTimeout(() => {
        order_message.style.display = 'none';
    }, 4000)

}

function processOrder(e) {
    e.preventDefault();
    console.log("process order");
    modal.style.display = 'block';    
}

function handleRemoveClick(id) {
    console.log("Remove click id: " + id);
    let len = orders.length;
    console.log("length of array: " + len);
    console.log("array: " + orders);
    //delete orders[id];
    const index = orders.indexOf(id);
    let deleted = false ;
    let idC = id;
    orders.forEach(function(item, i) {
        if(item.id === Number(id) && deleted===false) {
            orders.splice(Number(i), 1);
            deleted = true;
            console.log("idC: " + id + " len: " + len);
            len = len - 1;
            console.log("deleted");
        }
    })

     orders.forEach(function(item) {
        console.log("id: " + item.id + " name: " + item.name);    
    })

    if(orders.length === 0) {
        order_info.style.display = 'none';
    }

    renderOrder();
}

function handleAddClick(id) {
    console.log("id of order item: " + id);
    
    const menuItem = menuArray.find(item => Number(item.id) === Number(id));
    console.log("menu item name: " + menuItem.name);
    if(menuItem) {
        console.log("Menu Item");
        orders.unshift(menuItem);
        console.log("orders: " + orders);
        orders.forEach(function(item) {
            console.log("item name: " + item.name);
        })

        if(orders.length > 0) {
            order_info.style.display = 'block';
        }

        renderOrder();
    }
}

function renderOrder() {
    let dynHtml = '';
    orders.forEach(function(item) {
        dynHtml += `
        <div class="orders">
            <div class="ordered">
                <p class="order-name">${item.name}</p>
                <p class="remove" data-remove=${item.id}>Remove</p>
            </div>
            <p class="order-price">$${item.price}</p>
        </div>
        `
    })

    let Html = `
    <div class="order-page">Your order</div>
    ${dynHtml}
    <div class="cost-overview">
        <p class="total-cost">Total Price</p>
        <p class="price-number">$${getTotalCost()}</p>
    </div>
    <button class="order-button" id="order-button">Complete order</button>
    `;

    order_info.innerHTML = Html;

    document.getElementById('order-button').addEventListener('click', processOrder);

}

function getTotalCost() {
    let price = 0;
    orders.forEach(function(item) {
        price += Number(item.price);
    })

    return price;
}

function getHtml() {

    let html_str = '';

    for(let i=0; i<menuArray.length; i++) {
        html_str += `
        <div class="content" id="content">
            <div class="image">${menuArray[i].emoji}</div>
            <div class="details">
                <p class="name">${menuArray[i].name}</p>
                <p class="ingedients">${menuArray[i].ingredients}</p>
                <p class="price">${menuArray[i].price}</p>
            </div>
            <div class="select-button" data-add="${menuArray[i].id}">+</div>
        </div>
        `;

    }

    return html_str;
}

function render() {
    main_content.innerHTML = getHtml();
    order_message.style.display = 'none';
}

render();
