// Importing the list of products from /models/Products
const {products} = require(`../models/Product`);

// Declaring the variable to use for the list of products by deconstructing it.
let productsList = products.products;

// This function edits a product in the array of products.
let updateProduct=(request,response)=>{
    const itemId = Number(request.params.id);
    let findProduct = productsList.find(p => p.id === itemId);
    let index = productsList.indexOf(findProduct)
    updateProduct ={
      id: itemId,
      name: request.body.name,
      description: request.body.description,
      image: request.body.image,
      price: +request.body.price
    }
    productsList[index] = updateProduct;
    response.json(productsList);
  }

  module.exports = updateProduct;