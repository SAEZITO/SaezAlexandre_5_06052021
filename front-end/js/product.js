
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
                    <button type="button" name="add" id="pushProduct" class="selection__varnish--btn">Ajouter au panier</button>
                    </div>
                </div>
                `
    return tpl;
}

// on récupère les données du panier, si le panier est vide on l'initialise avec un array vide
let cart = JSON.parse(localStorage.getItem("cart")) || [];


request(apiFurniture + idProduct).then(article => {
    // affichage de la fiche produit       
    document.getElementById("mainBody").innerHTML = createProductTpl(article);

    //Ecoute de l'evenement pour envoie dans le panier
    document.getElementById("pushProduct")
        .addEventListener("click", (e) => {
            e.preventDefault()
            // on récupère les valeurs du produit choisi par l'utilisateur
            let selectedVarnish = document.querySelector("select").value;
            let quantity = document.getElementById("productQuantity");
            if (!quantity.checkValidity()) {
                alert("Vous devez choisir une quantité supérrieure à 0 et inférieure à 100");
            } else {
                //On les ajoutes à la classe produit puis les envoies au local storage
                const selectedProduct = new Product(article._id, article.name, quantity.value, article.price, selectedVarnish, article.imageUrl);
                localStorage.setItem("product", JSON.stringify(selectedProduct));


                if (cart.length == 0) {
                    // si le panier est vide, on ajoute le 1er produit
                    cart.push(selectedProduct);
                } else {
                    // sinon verifier si le produit selectionné existe déjà dans le localStorage pour accumuler les quantités

                    const sameProducts = cart.find(product => (product._id === selectedProduct._id) && (product.varnish === selectedProduct.varnish));

                    if (sameProducts) {
                        // quantité des produits calculée en additionnant la quantité déjà présente dans le storage et la nouvelle quantité ajoutée
                        sameProducts.quantity = Number(sameProducts.quantity) + Number(selectedProduct.quantity);
                    } else {
                        cart.push(selectedProduct);
                    }
                }

                // ajoute l'élement dans le localStorage
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        });

});

//Ajout d'un compteur au panier pour un effet plus visuel    
const basketCompt = basketCompteur(cart);
document.getElementById("basket__compteur").textContent = basketCompt;
console.log(basketCompt);