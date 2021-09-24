
function getArticles()
/*crée une fonction permettant de récupérer les info de l'API, de les convertirs en format 'json' et d'afficher une
alerte error si le fetch ne fonctionne pas*/
{
    return fetch("http://localhost:3000/api/furniture")
    .then(function(res){
        return res.json()
    })
    .catch(function(error){
        alert(error)
    })
}

function displayArticle(product)
{
    let template = document.querySelector("#template__product");
    console.log(product);
    var clone = document.importNode(template.content, true);
    var cloneLink = clone.getElementById("item__link");
    var cloneCard = clone.getElementById("product");
    var cloneTitle = clone.getElementById("item__title");
    var clonePic = clone.getElementById("item__picture");
    var clonePrice = clone.getElementById("item__price");
    var cloneDesc = clone.getElementById("item__descript");
   /*Creer des clones puis récupère chaque élément de l'API pour les caractéristique ciblées*/
    
    cloneTitle.textContent = product.name;
    clonePrice.textContent = product.price / 100 + ".00€";
    clonePic.setAttribute("src", product.imageUrl);
    cloneDesc.textContent = product.description;
    cloneLink.href += `?id=${product._id}`;

    /*intègre le produit en récupérant "main" dans la page et en créant son élément enfant "clone" qui correspond à itemCard*/
    document.getElementById("main").appendChild(clone);
}




    async function main()
{
    const articles = await getArticles()
    console.log(articles);
    for (product of articles) 
    {
        displayArticle(product)
    }
}
main()