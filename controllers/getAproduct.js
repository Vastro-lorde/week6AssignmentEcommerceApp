// Importing the list of products from /models/Products
const {products} = require(`../models/Product`);

// Declaring the variable to use for the list of products by deconstructing it
let productsList = products.products;

// This function finds a product in the array of products.
let findAproduct = (request, response)=>{
    const itemId = Number(request.params.id);
    const findProduct = productsList.filter(productsList => productsList.id === itemId);
    response.json(findProduct)
    console.log(itemId);
    console.log(request.url);
  }

module.exports = findAproduct