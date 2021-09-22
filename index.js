let itemcard = document.getElementById('product')

function getItems(){

		fetch("http://localhost:3000/api/furniture")
		.then(function(res) {
    			if (res.ok) {
      				return res.json();
   							 }
  							})
 		.then(function(value) {
    			document.getElementById("templateProduct");
    			})
  .catch(function(err) {
    // Une erreur est survenue
  });
}

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
    const template = document.getElementById("templateProduit");
    const clone = document.importNode(template.content, true);
    /*récupère les éléments de l'API pour les caractéristique ciblées*/
    clone.getElementById("item_title").textContent = product.name;
    clone.getElementById("item_price").textContent = product.price / 100 + ".00€";
    clone.getElementById("item_picture").setAttribute("src", product.imageUrl);
    clone.getElementById("item_body").textContent = product.description;
    clone.getElementById("item_link").href += `?id=${product._id}`;

    /*intègre le clone en récupérant "main" dans la page ainsi que son élément enfant "clone"*/
    document.getElementById("main").appendChild(clone);
}


   /* for(couleur of produit.colors)
    {
        document.getElementById(produit._id).innerHTML += `
        <option>${couleur}</option>`
    }
    }*/


    async function main()
{
    const articles = await getArticles()

    for (produit of articles) 
    {
        displayArticle(produit)
    }
}

main()