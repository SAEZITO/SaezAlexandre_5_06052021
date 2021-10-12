const form = document.getElementById("form");
const cart = document.getElementById("basket-list");
const totalPrice = document.getElementById("total__price");
const localCart = JSON.parse(localStorage.getItem('cart'));



// Permet l'affichage des produits du panier
const cartTpl = (data) => {
  let tpl = ''
  for (product of data) {
    tpl += `
            <li class="basket__item">
                <img class="basket__item--picture" alt="meuble en bois ${product.name}"src="${product.image}">
                <h2 class="basket__item--name">${product.name}</h2>
                <span class="basket__item--color">${product.varnish}</span>
                <label class="basket__item--quantity-label" for="quantity-${product.quantity}">Quantité</label>
                <input class="basket__item--quantity" id="quantity" name="quantity" type="number" min="1" value="${product.quantity}">
                <span class="basket__item--total">Prix: <strong class="price-qty">${product.price} .00</strong> €</span>
                <button type="submit" class="delete-basket">
            </li>`;
  }
  return tpl;
}




async function body(userInfo, localCart) {
    const body ={
    contact : await userInfo,
    products : localCart.map(product => product.id)
    };
    return body;
}

console.log(body);

cart.innerHTML = cartTpl(localCart);
totalPrice.textContent = totalCart(localCart);

document
.getElementById("form")
.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById("firstname")
    const lastName = document.getElementById("lastname")
    const adress = document.getElementById("adress")
    const city = document.getElementById("city")
    const mail = document.getElementById("mail")
    const userInfo = new User(firstName, lastName, adress, city, mail)
    body(userInfo, localCart)
    postData(apiFurniture + "order")
    .then(response => {
        console.log(response.json())
    });
});

