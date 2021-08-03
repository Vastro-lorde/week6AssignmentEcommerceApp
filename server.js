// importing the neccesary modules
const moment = require(`moment`);
const express = require(`express`);
const fs = require('fs');
const https = require('https');
const bodyParser = require(`body-parser`);
const {products} = require(`./models/Product`);
const path = require(`path`);
const { request, response } = require('express');
const updateProduct = require('./controllers/Uproducts');
const listAllProducts = require('./controllers/getProducts');
const findAproduct = require('./controllers/getAproduct');
const addProduct = require('./controllers/addAproduct');

const app = require('express')();

// setting up the middleware
app.use(bodyParser.urlencoded({ extended: true }))

// loads the home page.
app.get('/', (request,response)=>{
  console.log(`${products[0].name}`);
  response.sendFile(__dirname + '/views/index.html')
});

// list all the current products.  END POINT = "/products"
app.get('/products', listAllProducts);

// adds a product to the list of products. END POINT = "/add-product"
app.post('/add-product', addProduct);

// find a particular product by the id eg. /product/1. END POINT = "/product/:id"
app.get('/product/:id',findAproduct);

// update the values of an existing product. eg. /product/1. END POINT = "/product/:id"
app.put('/product/:id', updateProduct);

// delete a product  eg. /product/1. END POINT = "/product/:id"
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