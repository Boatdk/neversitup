const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 2020

const product = require('./routes/Product')
const order = require('./routes/Order')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/product', product)
app.use('/api/order', order)


app.listen(PORT, () => {
  console.log('run app in ' + PORT)
})