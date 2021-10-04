import {Product} from "./modules/function.js";

//Fonction de récupération des données de l'api
const request = async (url) => {
    return fetch(url)
        .then((res) => {
            console.log(res)
            return res.json();
        })
        .catch((error) => {
            console.error(error);
        })
}

// récupération de l'id du produit dans l'url
const idProduct = window.location.search.slice(4);

console.log(idProduct);

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
                        <h2 class="product__name>${article.name}</h2>

                        <p>${article.description}</p>

                         <p class="product__stock">En stock</p>
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

request("http://localhost:3000/api/furniture/" + idProduct).then(article => {
    // affichage de la fiche produit       
    document.getElementById("main").innerHTML = createProductTpl(article);

})

function addCart(article) {
    // on récupère les valeurs du produit choisi par l'utilisateur
    let selectedVarnish = document.querySelector("select").value;
    console.log(selectedVarnish);
    let quantity = document.getElementById("productQuantity").value;
    console.log(quantity);

    document.getElementById("pushProduct")
        .addEventListener("click", (e) => {
            e.preventDefault()
            const product = new Product(article._id, article.name, quantity, article.price, selectedVarnish)
            localStorage.product = JSON.stringify(product);
        });
}

       // Récupération des données produit dans une instance de classe


/*
    const addToCart = async (event) => {

                      event.preventDefault();
                      // on affiche un message d'erreur si options non selectionnées
                      if (selectedVarnish == "" || quantity =="") {
                          alert("Vous devez choisir une lentille et une quantité");
                      }else{



                        // on modifie le prix, la quantité
        selectedProduct.quantity = quantity;
        selectedProduct.price = (selectedProduct.price/100)*quantity;

        // on récupère les données du panier, si le panier est vide on l'initialise avec un array vide
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // si le panier est vide, on ajoute le 1er produit
        if (cart.length == 0) {
            cart.push(selectedProduct);
        }
        // sinon verifier si le produit selectionné existe déjà dans le localStorage pour accumuler les quantités
        else {
            // recherche les même id
            const sameProducts = cart.find(product => product._id === selectedProduct._id);
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
        }
      }

      const addBasket = document.getElementById("pushProduct")
                                .addEventListener("click", addToCart(e)); */