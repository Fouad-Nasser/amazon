const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const dbConnection = require('./config/db');

const port = process.env.PORT || 5000;
const environment = process.env.ENVIRONMENT || 'development';

dbConnection();

app.use(express.json());

if (environment === 'development') {
    app.use(morgan('common'));
  }


app.get('/',(req,res)=>{
    res.send('Start API');
});


app.listen(port,()=>{
    console.log(`Start Server on http://localhost:${port}/`);
});