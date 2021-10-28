const form = document.getElementById("form");
const cart = document.getElementById("basket-list");
const totalPrice = document.getElementById("total__price");
let localCart = JSON.parse(localStorage.getItem("cart"));
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let adress = document.getElementById("adress");
let city = document.getElementById("city");
let mail = document.getElementById("mail");

// Permet l'affichage des produits du panier
const cartTpl = (data) => {
  let tpl = ''
  for (product of data) {
    tpl += `
            <li class="item">
            <h2 class="item__name">${product.name}</h2>
                <img class="item__picture" alt="meuble en bois ${product.name}"src="${product.image}">
                <p class="item__varnishr">${product.varnish}</p>
                <label class="item__quantity-label" for="quantity-${product.quantity}">Quantité</label>
                <input class="item__quantity" id="quantity" name="quantity" type="number" min="1" max="99" value="${product.quantity}">
                <span class="item__total">Prix: <strong class="price-qty">${product.price} .00</strong> €</span>
                <i class="fa-solid fa-trash-can"><button type="submit" class="delete-basket"></i>
            </li>`;
  }
  return tpl;
}
if (localCart){
cart.innerHTML = cartTpl(localCart);
}else{
  cart.innerHTML = '<li>Votre panier est vide, veuillez choisir un article.</li>';
}


totalPrice.textContent = totalCartPrice(localCart);


document.getElementById("form-submit").addEventListener("click", (e) => {
    
    e.preventDefault();
    const userInfo = new User(firstName.value, lastName.value, adress.value, city.value, mail.value);

    const cartIds = localCart.map( product => product.id )
    console.log(firstName.checkValidity());
    console.log(lastName.checkValidity());
    console.log(city.checkValidity());
    console.log(adress.checkValidity());
    console.log(mail.checkValidity());


    //Controler le formulaire avant envoie
    if (firstName.checkValidity() && lastName.checkValidity() && adress.checkValidity() && city.checkValidity() && mail.checkValidity())
    {
    postData((apiFurniture + 'order'), userInfo, cartIds)
    .then (response => {
        localStorage.setItem("order", JSON.stringify({
          "orderId": response.orderId,
          "firstName": userInfo.firstName,
          "lastName": userInfo.lastName,
          "totalPrice": totalCartPrice(localCart)
        }));
        
        location.href = "../html/confirm.html" ; 
      })
      .catch (error => {
        console.log(error);
      })
    }
});
