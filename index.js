const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');
const {I18n} = require('i18n');


const i18n = new I18n({
    locales:['en','ar'],
    directory:path.join(__dirname,'translations'),
    defaultLocale:'en'
});


const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const dbConnection = require('./config/db');

const port = process.env.PORT || 5000;
const environment = process.env.ENVIRONMENT || 'development';

dbConnection();


const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const cartRouter = require('./routes/cart');
const CategoryRouter = require('./routes/category');
const SubCategoryRouter = require('./routes/subCategory');
const ProductRouter = require('./routes/product');
const OrderRouter = require('./routes/order');




app.use(cors());
app.use(express.json());
app.use(i18n.init);

app.use((req,res,next)=>{
    i18n.setLocale(req,req.headers['lang']);
    next();
});

if (environment === 'development') {
    app.use(morgan('common'));
  }


app.get('/',(req,res)=>{
    res.send(res.__('LANG'));
});

app.use('/users',userRouter);
app.use('/reviews',reviewRouter);
app.use('/carts',cartRouter);
app.use('/categorys',CategoryRouter);
app.use('/subCategorys',SubCategoryRouter);
app.use('/products',ProductRouter);
app.use('/orders',OrderRouter);


app.all('*', (req, res, next) => {
    res.status(404).json({err:'path not found'});

});


app.use((err, req, res, next)=>{
    res.status(400).json({err});
})


app.listen(port,()=>{
    console.log(`Start Server on http://localhost:${port}/`);
});