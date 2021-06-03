process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 
process.env.SERVER_PORT = process.env.SERVER_PORT || '3000';
process.env.JWT_SECRET = '0a6b944d-d2fb-46fc-a85e-0295c986cd9f';
process.env.MONGO_URL = 'mongodb://localhost/foodApp';

process
.on('uncaughtException',(err,origin = '')=>{
  console.log(`${err} UnCaught Exception Occured : ${origin}`)
})
.on('unhandledRejection', (err,origin='') => {
  console.log(`${err} Unhandled Rejection Occured : ${origin}`)
})

require('babel-polyfill');
require('babel-register');
require('./server');