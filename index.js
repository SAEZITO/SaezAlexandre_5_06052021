

const request = async (url) => {
    return fetch(url)
      .then((res) => {
        return res.json(),
      })
      .catch((error) => {
        console.error(error);
    })  
  }
  
   
   const createListingTpl = (products) => {
     if(products?.length === 0) {
       console.error("Product is empty");
       return;
     }
     
     let tpl = '';
     for(const product of products) {
       tpl = `<div id="product" class="item">
                <a class="item__link" href="product.html?id=${product._id}">
                  <h2 class="item__title">${product.name}</h2>
                  <img class="item__picture" src="${product.imageUrl}">
                      <p class="item__price">${product.price}</p>
                      <p class="item__descript">${product.description}</p>
                </a>
            </div>`;
     }
     return tpl;
   }
  
  request("http://localhost:3000/api/furniture").then( articles => {
      document.getElementById("main").innerHTML = createListingTpl(articles);
  })
  