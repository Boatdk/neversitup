const express = require('express')
const router = express.Router()

let products = []
const date = new Date()

router.route('/list')
  .get((req, res) => {
    if(products.length != 0){
      res.json({ message: "Success", products })
    }else{
      res.json({ message: "Dont have product" })
    } 
  })

router.route('/create')
  .post((req, res) => {
    const body = req.body
    const id = (products.length == 0)?1:products[products.length - 1].id + 1
    let product = {
      id: id,
      code: body.code,
      name: body.name,
      volume: body.volume,
      price: body.price,
      createDate: date.toISOString()
    }
    products.push(product)
    res.json({ message: "Create success", product })
  })


router.route('/:id')
  .get((req, res) => {
    const params = req.params
    const id = params.id
    const index = products.findIndex( product => (product.id === +id))
    if(!products[index]){
      res.json({ message: "Dont have this product id"})
    }else{
      res.json(products[index])
    }

  })

router.route('/update')
  .post((req, res) => {
    const body = req.body
    if(!body.id){
      return res.json({ message: "Plase fill product id" })
    }
    const id = body.id
    const index = products.findIndex( product => (product.id === +id))
    products[index].name = body.name
    products[index].volume = body.volume
    products[index].price = body.price
    products[index].code = body.code
    res.json({ message: "Update Success" })
  })

router.route('/delete')
  .post((req, res) => {
    const body = req.body
    const id = body.id
    const index = products.findIndex( product => (product.id === +id))
    products.splice(index, 1)
    res.json({ message: "Product deleted: " + body.id })
  })

module.exports = router