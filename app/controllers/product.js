function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}

const utils = require('./utils');
// import {generateUUID} from './utils.js'

class ProductException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}


class Product{
    constructor(title, description, imageURL, unit, stock, pricePerUnit, category){
        this.uuid = generateUUID();
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }

    get uuid(){
        return this.uuid;
    }
    set uuid(value){
        throw new ProductException("Products uuids are auto-generated");    
    }

    get title(){
        return this.title;
    }
    set title(value){
        if(typeof value !== "string" || value === ""){
            throw new ProductException("El titulo contiene error, compruebe el value");
        }else {
            this.title = value;
        }
    }

    get description(){
        return this.description;
    }
    set description(value){
        if(typeof value !== "string" || value === ""){
            throw new ProductException("La descripcion contiene error, compruebe el value");
        }else{
            this.description = value;
        }
    }

    get imageURL(){
        return this.imageURL;
    }
    set imageURL(value){
        if(typeof value !== "string" || value === ""){
            throw new ProductException("La URL contiene error, compruebe el value");
        }else{
            this.imageURL = value;
        }  
    }

    get unit(){
        return this.unit;
    }
    set unit(value){
        if(typeof value !== "string" || value === ""){
            throw new ProductException("Unit contiene error, compruebe el value");
        }else{
            this.unit = value;
        }  
    }

    get stock(){
        return this.stock;
    }
    set stock(value){
        if(typeof value !== "number" || value < 0){
            throw new ProductException("Stock contiene error, compruebe el value");
        }else{
            this.stock = value;
        }
    }

    get pricePerUnit(){
        return this.pricePerUnit;
    }
    set pricePerUnit(value){
        if(typeof value !== "number" || value < 0){
            throw new ProductException("La URL contiene error, compruebe el value");
        }else{
            this.pricePerUnit = value;
        }
    }

    get category(){
        return this.category;
    }
    set category(value){
        if(typeof value !== "string" || value === ""){
            throw new ProductException("Category contiene error, compruebe el value");
        }else{
            this.category = value;
        }
    }

    static createFromJson(jsonValue){
        let cola = JSON.parse(jsonValue);
        return this.createFromObject(cola);
    }

    static createFromObject(obj){
        let newProduct = {};
        Object.assign(newProduct, obj);
        Product.cleanObject(newProduct);
        let product = new Product(newProduct._title, newProduct._description, newProduct._imageURL, newProduct._unit, newProduct._stock, newProduct._pricePerUnit, newProduct._category);
        return product;
    }

    static cleanObject(obj){
        let properties = ['title', 'description', 'imageURL', 'unit', 'stock', 'pricePerUnit', 'category'];
        for(let i = 0; i<Object.keys(obj).length; i++){
            if(!properties.includes(Object.keys(obj)[i])){
                Object.keys(obj).splice(i,1);
            }
        }
    }

}

module.exports = Product;