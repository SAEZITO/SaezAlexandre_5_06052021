
// Creation du contenu html pour afficher la fiche produit
const createProductTpl = (article) => {
    if (article?.length === 0) {
        console.error("Product page's is empty");
        return;
    }
    // Recuperation pour affichage du produit
    let tpl = `
            <div class="product">
                <div class="product__img"><img src="${article.imageUrl}">
                </div>
               
                <div class="product__content">
                    <div class="product__description"> 
                        <h2 class="product__name">${article.name}</h2>

                        <p>${article.description}</p>

                        <p class="product__stock"> En stock </p>
                    </div>
                    
                     <div class="product__price">
                         <p>${article.price / 100}.00€</p>
                     </div>
                 </div>

                 <div class="product__selection">
                     <select class="selection__varnish" id="varnishList">`

    for (let varnish of article.varnish) {
        tpl += `
                      <option value="${varnish}">${varnish}</option>
                      `;
    }

    tpl +=
        `</select>
              <label> Quantité : <input id="productQuantity" type="number" step="1" pattern="[0-9]{,2}" value="1"/></label> 
                    <button type="button" name="add" id="pushProduct" class="selection__varnish--btn">Ajouter au panier</button>
                    </div>
                </div> `

    return tpl;
}

request(apiFurniture + idProduct).then(article => {
    // affichage de la fiche produit       
    document.getElementById("container").innerHTML = createProductTpl(article);



    document.getElementById("pushProduct")
        .addEventListener("click", (e) => {
            e.preventDefault()
            // on récupère les valeurs du produit choisi par l'utilisateur
            let selectedVarnish = document.querySelector("select").value;
            let quantity = document.getElementById("productQuantity").value;
            if (quantity <= 0) {
                alert("Vous devez choisir une quantité supérrieure à 0");
            } else {

                //On les ajoutes à la classe produit puis les envoies au local storage
                const selectedProduct = new Product(article._id, article.name, quantity, ((article.price * quantity) / 100), selectedVarnish, article.imageUrl);
                localStorage.setItem("product", JSON.stringify(selectedProduct));

                // on récupère les données du panier, si le panier est vide on l'initialise avec un array vide
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                if (cart.length == 0) {
                    // si le panier est vide, on ajoute le 1er produit
                    cart.push(selectedProduct);
                } else {
                    // sinon verifier si le produit selectionné existe déjà dans le localStorage pour accumuler les quantités

                    const sameProducts = cart.find(product => (product._id === selectedProduct._id) && (product.varnish === selectedProduct.varnish));

                    if (sameProducts) {
                        // quantité des produits calculée en additionnant la quantité déjà présente dans le storage et la nouvelle quantité ajoutée, idem pour prix
                        sameProducts.quantity = Number(sameProducts.quantity) + Number(selectedProduct.quantity);
                        sameProducts.price = sameProducts.price + selectedProduct.price;
                    } else {
                        cart.push(selectedProduct);
                    }
                }

                // ajoute l'élement dans le localStorage
                localStorage.setItem("cart", JSON.stringify(cart));
                //Ajout d'un compteur au panier pour un effet plus visuel    
                const basketCompteur = cart.length;
                document.getElementById("basket__compteur").textContent = basketCompteur

            }
        });






});

