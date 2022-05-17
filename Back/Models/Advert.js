const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Advert = mongoose.model(
  'Advert',
  new Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    category: String,
    authorEmail: String
  })
);

module.exports = Advert;
