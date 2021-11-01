class Product {
  constructor(idProduct, name, quantity, price, varnish, image) {
    this.id = idProduct;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.varnish = varnish;
    this.image = image;
  }
}

class User {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

// Adresse de l'api qui va permettre de comuniquer avec le back
const apiFurniture = "http://localhost:3000/api/furniture/";

// récupération de l'id du produit dans l'url
const idProduct = window.location.search.slice(4);

//Fonction de récupération des données de l'api
const request = async (url) => {
  return fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};
//Fonction d'envoie des informations vers l'api et recupére la réponse
const postData = async (url, userInfo, cart) => {
  const postData = { contact: userInfo, products: cart };
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  }).then((response) => {
    return response.json();
  });
};

//Calcule le prix du produit en fonction de la qantité
const totalProductPrice = (data) => {
  if (data.length === 0 || (!data?.price && !data?.quantity)) {
    console.error("data is empty");
    return;
  }
  let totalPrice = 0;
  totalPrice = (data.price * data.quantity) / 100;
  return totalPrice;
};

// Calcule le prix total des articles du panier
const totalCartPrice = (data) => {
  console.log(data);
  if (data.length === 0) {
    console.error("data is empty");
    return;
  }
  let totalPrice = 0;
  for (let product of data) {
    totalPrice += totalProductPrice(product);
  }
  return totalPrice;
};

//Permet de modifier la quantité d'un objet dans le panier
const basketPorductQuantity = (data, cart) => {
  if (data.length === 0) {
    console.error("data is empty");
    return;
  }
  for (product of cart) {
    if (data.id === product.id) {
      product.quantity = data.quantity;
    }
  }
  return localStorage.setItem("cart", JSON.stringify(cart));
};

//Compteur qui permet de connaitre le nombre total d'articles différents dans le panier et de l'afficher
const basketCompteur = (data) => {
  if (data.length === 0) {
    console.error("data is empty");
    return;
  }
  let compteur = 0;
  for (product of data) {
    compteur++;
  }
  document.getElementById("basketCompteur").textContent = compteur;
  return;
};

//fonction pour tester si produits deja dans panier et mettre panier dans localstorage
const checkCart = (selectedProduct, cart) => {
  if (cart.length === 0) {
    console.error("le panier est vide, impossible de vérifier le panier");
    return;
  } else {
    // sinon verifier si le produit selectionné existe déjà
    let sameProduct = cart.find(
      (product) =>
        product.id === selectedProduct.id &&
        product.varnish === selectedProduct.varnish
    );
    if (sameProduct) {
      // quantité des produits calculée en additionnant la quantité déjà présente dans le storage et la nouvelle quantité ajoutée
      sameProduct.quantity =
        Number(sameProduct.quantity) + Number(selectedProduct.quantity);
    } else {
      cart.push(selectedProduct);
    }
  }
  return cart;
};
