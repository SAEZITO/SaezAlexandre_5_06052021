    const itemCard = document.getElementById('product');
    const itemTitle = document.getElementById("item_title");
    const itemPrice = document.getElementById("item_price");
    const itemPic = document.getElementById("item_picture");
    const itemLink = document.getElementById("item_link");
    const itemDesc = document.getElementById("item_descript");


function getArticles()
/*crée une fonction permettant de récupérer les info de l'API, de les convertirs en format 'json' et d'afficher une
alerte error si le fetch ne fonctionne pas*/
{
    return fetch("http://localhost:3000/api/furniture")
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()
    })
    .catch(function(error){
        alert(error)
    })
}

function displayArticle(product)
{
   var clone = itemCard.cloneNode(true);
    /*récupère les éléments de l'API pour les caractéristique ciblées*/
    itemTitle.textContent = product.name;
    itemPrice.textContent = product.price / 100 + ".00€";
    itemPic.setAttribute("src", product.imageUrl);
    itemDesc.textContent = product.description;
    itemLink.href += `?id=${product._id}`;

    /*intègre le clone en récupérant "main" dans la page ainsi que son élément enfant "clone"*/
    document.getElementById("main").appendChild(clone);
}




    async function main()
{
    const articles = await getArticles()

    for (product of articles) 
    {
        displayArticle(product)
        console.log(itemPrice)
    }
}

main()