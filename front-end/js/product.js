let cart = JSON.parse(localStorage.getItem("cart")) || [];


let selectedProduct = new Product();

 //Fonction d'ajout du produit au panier
 const addProduct = () => {
    // on récupère les valeurs demandées à l'utilisateur
    const selectedVarnish = document.getElementById("varnishList").value;
    const quantity = document.getElementById("productQuantity");
    if (!quantity.checkValidity()) {
        alert("Vous devez choisir une quantité supérrieure à 0 et inférieure à 100");
    } else {
        selectedProduct.quantity = quantity.value;
        selectedProduct.varnish = selectedVarnish;
    }
    console.log(selectedProduct);
    checkCart(selectedProduct, cart);
    console.log(cart);
}

// Creation du contenu html pour afficher la fiche produit
const createProductTpl = (article) => {
    if (article?.length === 0) {
        console.error("Product page's is empty");
        return;
    }
    // Recuperation pour affichage du produit
    let tpl = `               
                <div class="product">
                <h2 class="product__title">${article.name}</h2>
                <a href="${article.imageUrl}"><img class="product__picture" src="${article.imageUrl}"></a>
                       
                       <p class="product__price">${article.price / 100}.00€</p>
                       <p class="product__stock"> En stock </p>
                       <p class="product__descript">${article.description}</p>

                       <div class="product__selection">
                     <select class="selection__varnish" id="varnishList">`

    for (let varnish of article.varnish) {
        tpl += `
                      <option value="${varnish}">${varnish}</option>
                      `;
    }

    tpl +=
        `</select>
              <label> Quantité : <input id="productQuantity" type="number" min="1" max="99" step="1" value="1"/></label> 
                    <button type="button" name="addProduct" onclick="addProduct()" class="selection__varnish--btn">Ajouter au panier</button>
                    </div>
                </div>
                `
    return tpl;
}

request(apiFurniture + idProduct).then(article => {
    // affichage de la fiche produit       
    document.getElementById("mainBody").innerHTML = createProductTpl(article);
    selectedProduct.id = article._id;
    selectedProduct.name = article.name;
    selectedProduct.price = article.price;
    selectedProduct.image = article.imageUrl;
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("le doc a bien chargé");
  
    console.log(cart);
   
});
    