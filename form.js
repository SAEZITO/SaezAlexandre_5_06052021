const form = document.getElementById("form");



function send(){
    return fetch("http://localhost:3000/api/furniture/order", {
	method: “POST”,
	headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
	body: JSON.stringify({
        name:document.getElementById("nom").name
        prename:document.getElementById("prenom").prename
        postalCode:document.getElementById("cp").postalCode
        city:document.getElementById("ville").city
        adress:document.getElementById("adresse").adress
        telNumber:document.getElementById("numTel").telNumber
        )

});
    console.log(form);
}



document
.getElementById("form")
.addEventListener("submit", send);