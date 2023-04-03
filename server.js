'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Image = require('./models/schema');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/images/:imageID', getImage);

async function getImage(request, response, next) {
  try {
    let id = request.params.imageID;

    let image = await Image.findById(id);

    response.status(200).send(image);

  } catch (error) {
    next(error);
  }
}

app.get('/images', getImages);

async function getImages(request, response, next) {
  try {
    let allImages = await Image.find({});

    response.status(200).send(allImages);

  } catch (error) {
    next(error);
  }
}

app.post('/images', postImage);


async function postImage(request, response, next) {
  try {
    let createdImage = await Image.create(request.body);
    response.status(201).send(createdImage);

  } catch (error) {
    next(error);
  }
}

app.delete('/images/:imageID', delImage);

async function delImage(request, response, next) {
  try {
    let id = request.params.imageID;

    await Image.findByIdAndDelete(id);

    response.status(200).send('Image deleted!');
  } catch (error) {
    next(error);
  }
}

app.put('/images/:imageID', updateImage);

async function updateImage(request, response, next) {
  try {
    let id = request.params.imageID;
    let data = request.body;

    const updatedImage = await Image.findByIdAndUpdate(id, data, { new: true, overwrite: true });

    response.status(200).send(updatedImage);
  } catch (error) {
    next(error);
  }
}



app.get('/test', (request, response) => {
  response.send('test request received');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (request, response) => {
  response.status(404).send('this route does not exist');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
