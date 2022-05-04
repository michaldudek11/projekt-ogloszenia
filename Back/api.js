// Zmienne env
require('dotenv').config()
const DB_URL = process.env.DB_URL;

// Mongodb 
const mongoose = require('mongoose')
const Advert = require('./Models/Advert')
const User = require('./Models/User')
mongoose.connect(DB_URL).catch((err) => console.error(err))

// Express 
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express()
const port = 3000


app.post('/register', jsonParser, (req, res) => {
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;

  const userToRegister = new User({
    email: registerEmail,
    password: registerPassword
  })

  User.findOne({ email: registerEmail }, (err, user) => {
    if (user) return res.json({status: "error", message: "Taki użytkownik już istnieje"})

    userToRegister.save((err) => console.log(err))
    res.status(200).json({status: "ok"})
  })

})

app.post('/login', (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
})

app.listen(port, () => {
  console.log('Serwer na porcie ' + port);
});