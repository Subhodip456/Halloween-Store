const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const ejs = require('ejs');

dotenv.config({path : 'config.env'})
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;
const secret_key = process.env.SECRET_KEY;
const publish_key = process.env.PUBLISH_KEY;



// log requests
app.use(morgan('tiny'));

mongoose.connect(uri,{ useNewUrlParser:true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`Mongodb is successfully connected: ${connection.host}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))
app.set("view engine", "ejs");
const stripe = require('stripe')(secret_key)


app.use(express.static(__dirname + '/public'));

app.get('/store',(req,res) =>{
    res.render('store.ejs',{
        publish_key:publish_key
    });
    console.log(publish_key)
    console.log(secret_key)
})

app.get('/halloween-store',(req,res) =>{
    res.render('halloween-store.ejs',{
        publish_key:publish_key
    });
    console.log(publish_key)
    console.log(secret_key)
})


app.listen(port,() =>{
    console.log(`Server is running on port: http://localhost:${port}`)
    });

// app.post('/charge',(req,res)=>{
//     try{
//         stripe.customers.create({
//             name: req.body.name,
//             email: req.body.email,
//             source: req.body.stripeToken
//         }).then(customer => stripe.charges.create({
//             amount: req.body.amount * 100,
//             currency: 'usd',
//             customer: customer.id,
//             description: 'Thank you for your generous donation.'
//         })).then(() => res.render('complete'))
//             .catch(err => console.log(err))
//     }catch(err){
//      res.send(err)
//     }
// })