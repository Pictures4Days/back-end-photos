'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Image = require('./models/schema');

async function seed() {
  await Image.create({
    title: 'adventure',
    imgUrl: 'https://cdn.pixabay.com/photo/2017/02/27/23/35/lighthouse-2104591_960_720.jpg',
    description: 'photo of a lighthouse',
    category: 'first',
    email: 'aezakmi@gmail.com',
  });

  console.log('');
  mongoose.disconnect();
}

seed();
