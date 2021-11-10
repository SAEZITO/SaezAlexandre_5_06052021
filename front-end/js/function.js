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

const apiFurniture = "http://localhost:3000/api/furniture/";

const idProduct = window.location.search.slice(4);

const request = async (url) => {
  return await fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

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
    console.log(response);
    return response.json();
  });
};

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

const totalProductPrice = (data) => {
  if (data.length === 0 || (!data?.price && !data?.quantity)) {
    console.error("data is empty");
    return;
  }
  let totalPrice = 0;
  totalPrice = (data.price * data.quantity) / 100;
  return totalPrice;
};

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

const checkCart = (selectedProduct, cart) => {
  if (cart.length === 0) {
    console.error("le panier est vide, impossible de vérifier le panier");
    return;
  } else {
    let sameProduct = cart.find(
      (product) =>
        product.id === selectedProduct.id &&
        product.varnish === selectedProduct.varnish
    );
    if (sameProduct) {
      sameProduct.quantity =
        Number(sameProduct.quantity) + Number(selectedProduct.quantity);
    } else {
      cart.push(selectedProduct);
    }
  }
  return cart;
};
