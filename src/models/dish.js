const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    Recipe: {
    type: String,
    required: true,
    trim: true,
  },
  Ingredients: [{
    type: String,
    required: true,
    trim: true,
  }],
  Calories: {
    type: Number,
    required: true,
  },
  PrepTimeInMins: {
    type: Number,
    required: true,
  },
  CookTimeInMins: {
    type: Number,
    required: true,
  },
  TotalTimeInMins: {
    type: Number,
    required: true,
  },
  Servings: {
    type: Number,
    required: true,
  },
  Cuisine: {
    type: String,
    trim: true,
  },
  Course: {
    type: String,
    trim: true,
  },
  Diet: {
    type: String,
    trim: true,
  },
  Instructions: {
    type: String,
    required: true,
  },
  ImageURL: {
    type: String,
    trim: true,
  },
  URL: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
