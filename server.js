// importing the neccesary modules
const moment = require(`moment`);
const express = require(`express`);
const fs = require('fs');
const https = require('https');
const bodyParser = require(`body-parser`);
const {products} = require(`./models/Product`);
const path = require(`path`);
const { request, response } = require('express');

const app = require('express')();

// setting up the middleware
app.use(bodyParser.urlencoded({ extended: true }))

// creating and declaring the global variables, class and functions
let productsList = products.products;
class newProduct{
  constructor(id, name, description, image, price){
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
  }
}

function changePath(request,response,next){
  if(request.url === '/product/:id'){request.url === path.join('product',`${request.params.id}`)}
  console.log(request.url.id);
  next();
}


// loads the home page.
app.get('/', (request,response)=>{
  
  console.log(`${productsList[0].name}`);
  response.sendFile(__dirname + '/views/index.html')
});

// list all the current products.
app.get('/products', (request,response)=>{
    console.log(productsList.length);
    response.json(productsList)
    
});

// adds a product to the list of products.
app.post('/add-product', (request,response)=>{
  console.log(request.body);
  const Product = new newProduct(
    +productsList.length + 1, 
    `${request.body.name}`, 
    `${request.body.description}`,
    `${request.body.image}`,
    +request.body.price)
    productsList.push(Product);
  response.json(productsList);
});

// find a particular product by the id eg. /product/1.
app.get('/product/:id',(request, response)=>{
  const itemId = Number(request.params.id);
  const findProduct = productsList.filter(productsList => productsList.id === itemId);
  response.json(findProduct)
  console.log(itemId);
  console.log(request.url);
});

// update the values of an existing product.
app.put('/product/:id', (request,response)=>{
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
});

// delete a product
app.delete('/product/:id',(request,response)=>{
  const itemId = Number(request.params.id);
  const findProduct = productsList.findIndex(p => p.id === itemId);
  let index = +findProduct;
  productsList.splice(index, 1);
  console.log(index);
  console.log(productsList);
  response.json(productsList)
});

// creating the server using https protocol for secure connect(since we are dealing with money).
const server = https.createServer({
  key: fs.readFileSync(`${__dirname}/server.key`, 'utf8'),
  cert: fs.readFileSync(`${__dirname}/server.cert`, 'utf8')
}, app).listen(3000, (request,response)=>{
    console.log(`listening at https://localhost:3000/`);
});