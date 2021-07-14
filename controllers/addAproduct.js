// Importing the list of products from /models/Products
const {products} = require(`../models/Product`);


// Declaring the variable to use for the list of products by deconstructing it.
let productsList = products.products;

// creates the class for making objects to push to the array of objects
class newProduct{
    constructor(id, name, description, image, price){
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
      this.price = price;
    }
  }

// This function adds the product to the array of products.
let addProduct = (request,response)=>{
    console.log(request.body);
    const Product = new newProduct(
      +productsList.length + 1, 
      `${request.body.name}`, 
      `${request.body.description}`,
      `${request.body.image}`,
      +request.body.price)
      productsList.push(Product);
    response.json(productsList);
  }

  module.exports = addProduct;