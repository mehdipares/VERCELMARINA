const express = require("express");
const dotenv = require("dotenv").config();
//const test = require("./controllers/user");
const cors = require('cors');

const indexRouter = require('./routes/index');
const mongodb = require('./db/mongo');

const app = express();

const port = process.env.PORT || 3000;

mongodb.initClientDbConnection();

app.use(cors({
  exposedHeaders: ['Authorization'], 
  origin: "*"
}));

app.get('/', (req, res) => {
  res.type('text/html')
  res.send('<h1>Hello World</h1>')
})

/*
app.get("/", test.login);
*/
app.listen(port, () => {
  `Server started on port ${port}`;
});


app.use(function(req, res, next) {
  res.status(404).json({name:'API', version:'1.0', status: 404, message: 'not_found'});
});

module.exports = app;