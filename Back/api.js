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

    userToRegister.save((err) => err && console.log(err))
    res.status(200).json({status: "ok"})
  })

})

app.post('/login', jsonParser, (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;

  User.findOne({email: loginEmail}, (err, user) => {
    if (err) return res.status(404).json({status: "error", message: "Błąd podczas logowania"})

    if (!user) return res.status(404).json({status: "error", message: "Nie ma użytkownika z takim mailem"})

    if (user.password !== loginPassword) return res.status(404).json({status: "error", message: "Nieprawidłowe hasło"})

    res.status(200).json({status: "ok"})
  })
})

app.listen(port, () => {
  console.log('Serwer na porcie ' + port);
});