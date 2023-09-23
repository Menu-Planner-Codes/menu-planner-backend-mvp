const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dish');

// Define user routes
router.post('/addDish', dishController.addDish);
router.post('/recommend-meal', dishController.recommendMealPlan);
router.post('/shuffle', dishController.recommendMeal);

module.exports = router;
