const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const modules = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const router = require('./routes/index');
const errorMW = require('./middleware/ErrorHM');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const insertTestData = require('./models/seeds');
const ApiError = require('./error/ApiError');



const PORT = process.env.PORT || 8080
const app = express()

const corsOptions = {
    origin: [process.env.ORIGIN_URL],
    methods: "GET,HEAD,PUT,PATCH,POST",
    credentials: true
  };

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
  
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; 

    if (!apiKey) {
      return next(ApiError.badRequest('API key missing'));    }

    if (apiKey !== process.env.KEY_FRONTED_CONNENT) {
      return next(ApiError.forbidden('Invalid API key')); 
    }

    next(); 
};
  
app.use('/api', checkApiKey, router)  


// в конце
app.use(errorMW)


const start = async () => {
    try{
        //await insertTestData();
        //await sequelize.authenticate()
        //await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server start ${PORT}`))
    } catch(e){
        console.log(e)

    }
}
start()