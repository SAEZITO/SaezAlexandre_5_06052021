

const createListingTpl = (products) => {
  if (products?.length === 0) {
    console.error("Product is empty");
    return;
  }

  let tpl = '';
  for (const article of products) {
    tpl += `<div class="item">
                <a class="item__link" href="./html/product.html?id=${article._id}">
                  <h2 class="item__title">${article.name}</h2>
                  <img class="item__picture" src="${article.imageUrl}">
                      <p class="item__price">${article.price / 100}.00€</p>
                      <p class="item__descript">${article.description}</p>
                </a>
            </div>`;
  }
  return tpl;
}

request(apiFurniture).then(articles => {
  document.getElementById("main").innerHTML = createListingTpl(articles);
})
