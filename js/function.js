 class Product{
    constructor(idProduct, name, quantity, price, varnish){

        this.id = idProduct
        this.name = name
        this.quantity = quantity
        this.price = price
        this.varnish = varnish
        }
}

class User {
    constructor(firstname, lastname, city, adress, mail){
        this.firstname = firstname
        this.lastname =lastname
        this.city = city
        this.adress = adress
        this.mail = mail
    }
}
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

   // fetch post pour envoyer les informations vers l'api
 const postData = async (url) => {
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ contact, cart })
    })
    .then(response => {
      console.log(response)
      if (!response.ok){
        console.log('Requête échouée')
        submitBtnSmall.innerText = "Envoi échoué"
      }else{
        console.log('Requête réussie')
        return response.json()
      }
    })
    .then(info => {
        console.log(info);
      })
  };

  
//Compteur qui permet de connaitre le nombre total d'articles dans le panier
const basketCompteur = (data) =>{
          let compteur = 0
                for (product of data){
                    compteur += product.quantity
                }
        return compteur;
      }

// Permet l'affichage des produits du panier
const cartTpl = (data) => {
        let tpl = ''
        for (product of data){
            tpl += `
            <li class="basket__item">
                <img class="basket__item--picture" alt="meuble en bois ${product.name}"src="${product.imageUrl}">
                <h2 class="basket__item--name">${product.name}</h2>
                <span class="basket__item--color">${product.varnish}</span>
                <label class="basket__item--quantity-label" for="quantity-${product.quantity}">Quantité</label>
                <input class="basket__item--quantity" id="quantity" name="quantity" type="number" min="1" value="${product.quantity}">
                <span class="basket__item--total">Prix: <strong class="price-qty">${product.price} .00</strong> €</span>
                <button type="submit" class="delete-basket">
            </li>`;
        }
        console.log(tpl);
        return tpl ;
    }

// Calcule le prix total des articles du panier
const totalCart = (data) => {
        let totalPrice = 0 ;
        for (product of data){
            totalPrice += product.price;
        }
    return totalPrice ;
    }
