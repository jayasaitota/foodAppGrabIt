
require ('./server/config/dbConnection');
import express from 'express';
import expressStatic from 'express-static';
import bodyParser from 'body-parser';

import routes from './server/routes';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json({type:"application/json"}))
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/docs', expressStatic(`${__dirname}/server/upload/`));
app.use('/api',routes);

app.get('', (req, res) => {
  return res.send("Server is up and running")
});

const server = app.listen(SERVER_PORT,()=>{
  console.log(`Server Started and running on port  ${SERVER_PORT}`)
})

export default server;