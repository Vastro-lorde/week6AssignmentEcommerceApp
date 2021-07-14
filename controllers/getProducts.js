// Importing the list of products from /models/Products
const {products} = require(`../models/Product`);

// Declaring the variable to use for the list of products by deconstructing it
let productsList = products.products;

// This function lists all products in the array of products.
let listAllProducts = (request,response)=>{
    console.log(productsList.length);
    response.json(productsList)
    
}

module.exports = listAllProducts;