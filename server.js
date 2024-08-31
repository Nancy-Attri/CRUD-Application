// console.log('Hello');
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({extended: false}))

//routes (to access this on chrome)
app.get('/',(req,res)=>{  //'/'=root directery ,req=request ,res=repond
    res.send('Hello Node API')
})


//using the kit to keep tracking of code

app.get('/blog',(req,res)=>{  
    res.send('Hello Blog, my name is Nancy')
})


//  app.get('/test', (req, res) => {
//      res.send( req.body);
//  });


app.get('/products',async(req,res) => {

    try {
        const products  = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})  

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
    app.post('/products',async(req,res) => {
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message})
    }

});

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.listen(3000, ()=>{
    // console.log('Node API is runnung on port 3000') 
    console.log('Server is running on http://localhost:3000');
    
 })

mongoose.
connect('mongodb+srv://NancySharma:7015977577@nancyapi.mdqjc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NancyAPI')
.then(() => {
    console.log('connected to MongoDB');
})
.catch((error) => {
    console.log('Error connecting to MongoDB:',error);
});