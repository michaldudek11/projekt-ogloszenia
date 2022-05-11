// Zmienne env
require('dotenv').config();
const DB_URL = process.env.DB_URL;

// Mongodb
const mongoose = require('mongoose');
const Advert = require('./Models/Advert');
const User = require('./Models/User');
mongoose.connect(DB_URL).catch((err) => console.error(err));

// Express
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

app.post('/register', jsonParser, (req, res) => {
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;

  const userToRegister = new User({
    email: registerEmail,
    password: registerPassword,
  });

  if (!registerEmail || !registerPassword) {
    return res.status(400).json({ error: 'Brakuje maila lub hasła' });
  }

  User.findOne({ email: registerEmail }, (err, user) => {
    if (user)
      return res.status(400).json({ status: 'error', message: 'Taki użytkownik już istnieje' });

    userToRegister.save((err) => err && console.log(err));
    res.status(200).json({ status: 'ok' });
  });
});

app.post('/login', jsonParser, (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;

  User.findOne({ email: loginEmail }, (err, user) => {
    if (err) return res.status(404).json({ status: 'error', message: 'Błąd podczas logowania' });

    if (!user)
      return res.status(404).json({
        status: 'error',
        message: 'Nie ma użytkownika z takim mailem',
      });

    if (user.password !== loginPassword)
      return res.status(404).json({ status: 'error', message: 'Nieprawidłowe hasło' });

    res.status(200).json({ status: 'ok' });
  });
});

app.delete('/postDelete', jsonParser, (req, res) => {
  const postID = req.body.postID || null;

  if (!postID) return res.status(400).json({ status: 'Nie podano ID' });

  Advert.findOne({ _id: postID }, (advert, err) => {
    if (!advert) {
      return res.status(404).json({ status: 'Nie znaleziono takiego ogłoszenia' });
    }

    Advert.deleteOne({ _id: postID });

    res.status(200).json({ status: 'ok' });
  });
});

app.get('/getAllPosts', async (req, res) => {
  const adverts = await Advert.find({}).limit(20);

  res.status(200).send(adverts);
});

app.post('/addPost', jsonParser, async (req, res) => {
  if (!req.body) res.status(400);

  const { title, description, image, price, category } = req.body;

  const postToAdd = new Advert({
    title,
    description,
    image,
    price,
    category,
  });

  postToAdd.save((err) => {
    console.log(`Błąd w dodawaniu: ${err}`);
    res.status(500);
  });

  res.status(200);
});

app.put('/editPost', jsonParser, (req, res) => {
  const postID = req.body.postID;
  if (!postID) res.status(400);

  const filteredProps = Object.entries(req.body).filter((entry) => {
    return entry[0] !== '_id'; // Nie aktualizujemy id
  });

  const propsToUpdate = Object.fromEntries(filteredProps);
  Advert.updateOne({ _id: postID }, propsToUpdate, (updatedAdvert, err) => {
    if (err) {
      res.status(500);
      console.log(`Błąd w aktualizowaniu: ${err}`);
    }
    if (!updatedAdvert) res.status(404);
  });

  res.status(200);
});
app.listen(port, () => {
  console.log('Serwer na porcie ' + port);
});
