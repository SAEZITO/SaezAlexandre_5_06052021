let selectedProduct = new Product();
document.addEventListener("DOMContentLoaded", function () {
  let localCart = JSON.parse(localStorage.getItem("cart"));

  if (localCart) {
    basketCompteur(localCart);
  }
  request(apiFurniture + idProduct).then((article) => {
    document.getElementById("mainBody").innerHTML = createProductTpl(article);
    selectedProduct.id = article._id;
    selectedProduct.name = article.name;
    selectedProduct.price = article.price;
    selectedProduct.image = article.imageUrl;
  });
});

const createProductTpl = (article) => {
  if (article?.length === 0) {
    console.error("Product page's is empty");
    return;
  }
  let tpl = `               
                <div class="product">
                <h2 class="product__title">${article.name}</h2>
                <a href="${
                  article.imageUrl
                }"><img class="product__picture" src="${article.imageUrl}"></a>
                      
                <div class="product__description">
                       <p class="product__price">Prix :  ${
                         article.price / 100
                       }.00€</p>
                       <p class="product__stock"> En stock </p>
                       <p class="product__descript">${article.description}</p>
                </div>
                       <div class="product__selection">
                       <label>Vernis :</label><select class="selection__varnish" id="varnishList">`;

  for (let varnish of article.varnish) {
    tpl += `
    <option value="${varnish}">${varnish}</option>
    `;
  }

  tpl += `</select>
  <label> Quantité : </label> <input id="productQuantity" type="number" min="1" max="99" step="1" value="1"/>
  <button type="button" name="addProduct" onclick="addProduct()" class="product__selection-btn">Ajouter au panier</button>
  </div>
  </div>
  `;
  return tpl;
};

const addProduct = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const selectedVarnish = document.getElementById("varnishList").value;
  const quantity = document.getElementById("productQuantity");
  if (!quantity.checkValidity()) {
    alert(
      "Vous devez choisir une quantité supérrieure à 0 et inférieure à 100"
    );
  } else {
    selectedProduct.quantity = quantity.value;
    selectedProduct.varnish = selectedVarnish;
  }
  if (cart.length === 0) {
    cart.push(selectedProduct);
  } else {
    checkCart(selectedProduct, cart);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  basketCompteur(cart);
  alert("Le produit choisi ce trouve maintenant dans votre panier");
};
