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
let i = 0;

// Permet l'affichage des produits du panier
const cartTpl = (data) => {
  let tpl = "";
  for (product of data) {
    tpl += `
            <div class="cart__item" id="item${i}">
            <h2 class="cart__item__title">${product.name}</h2>
                <img class="cart__item__picture" alt="meuble en bois ${
                  product.name
                }"src="${product.image}">
                <label class="cart__item__quantity-label" for="quantity-${
                  product.quantity
                }">Quantité</label>
                <p>${product.quantity}</p>
                <p class="cart__item__varnish itemVarnish">${
                  product.varnish
                }</p>
                <span class="cart__item__total">Prix: <strong class="price-qty">${
                  (product.price / 100) * product.quantity
                } .00</strong> €</span>
                // <i class="fas fa-trash-alt"><button onclick="deleteProduct(${i})" class"deleteProduct"></i>
            </div>`;
  }
  i++;
  return tpl;
};
if (localCart) {
  cart.innerHTML = cartTpl(localCart);
  basketCompteur(localCart);
  totalPrice.textContent = totalCartPrice(localCart);
} else {
  cartInfo.innerHTML = " ";
  title.textContent = `Votre panier est vide, veuillez choisir un article sur la page d'accueil.`;
}

deleteCart.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  cart.innerHTML = " ";
  cartInfo.innerHTML = " ";
  title.textContent = `Vous venez de vider votre panier.`;
});

document.getElementById("form-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const userInfo = new User(
    firstName.value,
    lastName.value,
    adress.value,
    city.value,
    mail.value
  );

  const cartIds = localCart.map((product) => product.id);

  //Controler le formulaire avant envoie
  if (
    firstName.checkValidity() &&
    lastName.checkValidity() &&
    adress.checkValidity() &&
    city.checkValidity() &&
    mail.checkValidity()
  ) {
    postData(apiFurniture + "order", userInfo, cartIds)
      .then((response) => {
        localStorage.setItem(
          "order",
          JSON.stringify({
            orderId: response.orderId,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            totalPrice: totalCartPrice(localCart),
          })
        );

        location.href = "../html/confirm.html";
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const deleteProduct = (i) => {
  const product = document.getElementById("item" + i);
  product.remove();
  localCart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(localCart));
  basketCompteur(localCart);
  totalPrice.textContent = totalCartPrice(localCart);
};
