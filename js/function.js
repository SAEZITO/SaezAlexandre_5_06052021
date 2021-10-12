class Product {
  constructor(idProduct, name, quantity, price, varnish, image) {

    this.id = idProduct
    this.name = name
    this.quantity = quantity
    this.price = price
    this.varnish = varnish
    this.image = image
  }
}

class User {
  constructor(firstname, lastname, city, adress, mail) {
    this.firstname = firstname
    this.lastname = lastname
    this.city = city
    this.adress = adress
    this.mail = mail
  }
}
// Adresse de l'api qui va permettre de comuniquer avec le back
const apiFurniture = "http://localhost:3000/api/furniture/"
// récupération de l'id du produit dans l'url
const idProduct = window.location.search.slice(4);

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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => {
      console.log(response)
      if (!response.ok) {
        console.log('Requête échouée')
      } else {
        console.log('Requête réussie')
        return response.json()
      }
    })
    .then(info => {
      console.log(info);
    })
};


//Compteur qui permet de connaitre le nombre total d'articles dans le panier
const basketCompteur = (data) => {
  let compteur = 0
  for (product of data) {
    compteur += product.quantity
  }
  return compteur;
}



// Calcule le prix total des articles du panier
const totalCart = (data) => {
  let totalPrice = 0;
  for (let product of data) {
    totalPrice += product.price;
  }
  return totalPrice;
}
