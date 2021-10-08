const form = document.getElementById("form");
const cart = document.getElementById("basket-list");
const totalPrice = document.getElementById("total__price")
const formEl = document.forms.form;
const formData = new FormData(formEl);
const localCart = JSON.parse(localStorage.getItem('cart'));
const body = {
    "contact": formData.values(),
    "products": localCart.map(product => product._id)
};


async function send() {
    return await fetch("http://localhost:3000/api/furniture/order", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

console.log(formData);

cart.innerHTML = cartTpl(localCart);
totalPrice.textContent = totalCart(localCart);

document
    .getElementById("form")
    .addEventListener("submit", (e) => {
        e.preventDefault();
        send()
            .then(response => {
                console.log(response.json());
            });
    });