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
const fs = require('node:fs/promises');




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
app.use(helmet({crossOriginResourcePolicy: false}));
app.use(limiter);
app.use(express.json())
app.get('/static/product/:filename', async (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'static', 'product', filename);

  try {
      const fileStats = await fs.stat(filepath);
      if (!fileStats.isFile()) {
          return res.status(404).send('Image not found');
      }

      const ext = path.extname(filename).toLowerCase();
      const contentType = getContentType(ext); // функция определения типа

      res.setHeader('Content-Type', 'image/jpeg');
      res.sendFile(filepath);
  } catch (error) {
      console.error('Ошибка при отправке файла:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.use(fileUpload({}));

function getContentType(ext) {
  switch (ext) {
      case '.jpg':
      case '.jpeg':
          return 'image/jpeg';
      case '.png':
          return 'image/png';
      case '.gif':
          return 'image/gif';
      default:
          return 'application/octet-stream';
  }
}
  
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
        
        //await sequelize.authenticate()
        //await sequelize.sync()
        //await insertTestData();
        app.listen(PORT, ()=> console.log(`Server start ${PORT}`))
    } catch(e){
        console.log(e)

    }
}
start()