export default class Product{
    constructor(idProduct, name, quantity, price, varnish){

        this.id = idProduct
        this.name = name
        this.quantity = quantity
        this.price = price
        this.varnish = varnish
        }
}

export class User {
    constructor(name, prename, postal, city, adress, phone){
        this.name = name
        this.prename =prename
        this.postal = postal
        this.city = city
        this.adress = adress
        this.phone = phone
    }
}