const form = document.getElementById("form");
const cart = document.getElementById("mainBody");
const cartInfo = document.getElementById("cartResume");
const deleteCart = document.getElementById("deleteAllCart");
const totalPrice = document.getElementById("totalPrice");
const title = document.getElementById("pageTitle");
let localCart = JSON.parse(localStorage.getItem("cart"));
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let adress = document.getElementById("adress");
let city = document.getElementById("city");
let mail = document.getElementById("mail");
console.log(localCart);
// Permet l'affichage des produits du panier
const cartTpl = (data) => {
  let tpl = ''
  for (product of data) {
    tpl += `
            <div class="item">
            <h2 class="item__title">${product.name}</h2>
                <img class="item__picture" alt="meuble en bois ${product.name}"src="${product.image}">
                <label class="item__quantity-label" for="quantity-${product.quantity}">Quantité</label>
                <input class="item__quantity quantity" name="quantity" type="number" min="1" max="99" value="${product.quantity}">
                <p class="item__varnish itemVarnish">${product.varnish}</p>
                <span class="item__total">Prix: <strong class="price-qty">${(product.price / 100) * product.quantity} .00</strong> €</span>
                <i class="fas fa-trash-alt"><button onclick="deleteProduct(${product.id}) class="deleteProduct"></i>
            </div>`;
  }
  return tpl;
}
if (localCart) {
  cart.innerHTML = cartTpl(localCart);
} else {
  cartInfo.innerHTML = ' ';
  title.textContent = `Votre panier est vide, veuillez choisir un article sur la page d'accueil.`;
}


//totalPrice.textContent = totalCartPrice(localCart);


deleteCart.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  cart.innerHTML = ' ';
  cartInfo.innerHTML = ' ';
  title.textContent = `Vous venez de vider votre panier.`;
});

document.getElementById("form-submit").addEventListener("click", (e) => {

  e.preventDefault();
  const userInfo = new User(firstName.value, lastName.value, adress.value, city.value, mail.value);

  const cartIds = localCart.map(product => product.id);

  //Controler le formulaire avant envoie
  if (firstName.checkValidity() && lastName.checkValidity() && adress.checkValidity() && city.checkValidity() && mail.checkValidity()) {
    postData((apiFurniture + 'order'), userInfo, cartIds)
      .then(response => {
        localStorage.setItem("order", JSON.stringify({
          "orderId": response.orderId,
          "firstName": userInfo.firstName,
          "lastName": userInfo.lastName,
          "totalPrice": totalCartPrice(localCart)
        }));

        location.href = "../html/confirm.html";
      })
      .catch(error => {
        console.log(error);
      })
  }
});

