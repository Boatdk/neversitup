const express = require('express')
const router = express.Router()

let orders = []
const date = new Date()

router.route('/list')
  .get((req, res) => {
    if(orders.length != 0){
      return res.json({ message: "Success", orders })
    }else{
      return res.json({ message: "Dont have order now" })
    }
  })

router.route('/:id')
  .get((req, res) => {
    const params = req.params
    const id = params.id
    const index = orders.findIndex( order => (order.id === +id))
    if(!orders[index]){
      return res.json({ messgage: "Dont have this id" })
    }else{
      return res.json(orders[index])
    }
  })

router.route('/create')
  .post((req, res) => {
    const body = req.body
    const id = (orders.length == 0)?1:orders[orders.length - 1].id + 1
    let order = {
      id: id,
      user: body.userId,
      price: body.price,
      status: 0,
      createDate: date.toISOString()
    }
    orders.push(order)
    res.json({ message: "Create success", order })
  })

router.route('/update')
  .post((req, res) => {
    const body = req.body
    const id = body.id
    const index = orders.findIndex( order => (order.id === +id))
    orders[index].status = body.status
    if(body.status === 1){
      return res.json({ message: "Pay success" })
    }else if(body.status === 2){
      return res.json({ message: "Cancel order" })
    }
  })

module.exports = router