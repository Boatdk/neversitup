const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/jwt')
let users = []

router.route('/list')
  .get((req, res) => {
    res.json(users)
  })

router.route('/register')
  .post(async(req, res) => {
    const body = req.body
    if(!body.username){
      return res.json({ message: "Please fill username" })
    }

    if(!body.password){
      return res.json({ message: "Please fill password" })
    }

    if(!body.firstname){
      return res.json({ message: "Please fill your firstname" })
    }

    if(!body.lastname){
      return res.json({ message: "Please fill your lastname" })
    }

    const id = (users.length == 0)?1:users[users.length - 1].id + 1
    const salt = await bcrypt.genSalt(11)
    const hashedPsw = await bcrypt.hash(body.password, salt)
    const userId = id+'010'
    let user = {
      id: id,
      userId: userId,
      username: body.username,
      password: hashedPsw,
      firstname: body.firstname,
      lastname: body.lastname
    }

    users.push(user)
    res.json({ message: "Register success", user })
  })

router.route('/login')
  .post(async(req, res) => {
    const body = req.body
    if(!body.username){
      return res.json({ message: "Please fill username" })
    }
    
    if(!body.password){
      return res.json({ message: "Please fill password" })
    }

    const index = users.findIndex( user => (user.username === body.username))
    if(!users[index]){
      return res.json({ message: "Dont have this username" })
    }else{
      const login = await bcrypt.compare(body.password, users[index].password)
        if(!login){
          return res.json({ message: "Incorrect password" })
        }else{
          const payload = {
            id: users[index].id,
            username: users[index].username
          }
          const token = jwt.sign(payload, config.jwtSecret, { algorithm: 'HS256', expiresIn: 10000 })
          return res.json({ message: "Login success", token: "Bearer " + token})
        }
    }
  })

router.route('/:username')
  .get((req, res) => {
    const params = req.params
    const index = users.findIndex( user => (user.username === params.username))
    if(!users[index]){
      return res.json({ message: "Dont have this username" })
    }else{
      return res.json(users[index])
    }

  })


module.exports = router