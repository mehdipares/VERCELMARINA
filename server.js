const express = require("express");
const dotenv = require("dotenv").config();
const test = require("./controllers/user");

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.type('text/html')
  res.send('<h1>Hello World</h1>')
})
app.get("/", test.login);

app.listen(port, () => {
  `Server started on port ${port}`;
});