// import * as fs from 'node:fs';
// import fs from 'fs'
// import {fs} from 'fs';
const fs = require('fs');

const express = require('express');
const Product = require('./product');

let content = fs.readFileSync('./app/data/products.json');
let products = [];
products = JSON.parse(content);


function getProducts(){
    return products;
}

function getProductById(uuid){
    for(let i = 0; i < products.length; i++){
        if(products[i].uuid == uuid){
            return products[i];
            
        }
    }
}

function createProduct(product){
    products.push(Product.createFromObject(product));
}

function updateProduct(uuid, updatedProduct){
    for(let i = 0; i < products.length; i++){
        if(products[i].uuid == uuid){
            products.splice(i, 1, updatedProduct);
        }
    }
}

function deleteProduct(uuid){
    for(let i = 0; i < products.length; i++){
        if(products[i].uuid == uuid){
            products.splice(i, 1);
        }
    }
}

function findProducts(x){
    let filter = [];
    
    if(x.charAt(x.length-1) == ':'){ //only category
        for(let i in products){
            if(products[i].category.includes(x.substring(0,x.length-2))) filter.push(products[i]);
        }
        return filter;
    }

    else if(x.includes(':') == false){ //Only title
        for(let i in products){
            if(products[i].title.includes(x.substring(0,x.length-1))) filter.push(products[i]);
        }
        return filter;
    }

    let a = x.split(':');

    for(let i in products){
        if(products[i].category.includes(""+a[0])){
            if(products[i].title.includes(""+a[1])){
                filter.push(products[i]);
            }
        } 
    }
    return filter;
}

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.findProducts = findProducts;