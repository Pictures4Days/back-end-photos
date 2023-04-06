'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const imgSchema = new Schema({
  title: {type: String, required: true},
  imgUrl:{type: String, required: true},
  description: {type: String, required: true},
  category:{type: String, required:true},
  userEmail:{type:String, required: true},
});


const Image = mongoose.model('image', imgSchema);

module.exports = Image;
