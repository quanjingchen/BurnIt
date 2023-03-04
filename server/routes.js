const express = require('express');
require('dotenv').config();

const controllers = require('./controllers');

const router = express.Router();

router.get('/users/:uid', controllers.users.getUserData);

router.post('/users', controllers.users.createOrUpdateUser);


router.get('/meals', controllers.meals.getMealByDate);

router.get('/meals/summary', controllers.meals.getCaloriesByDays);

router.get('/meals/suggestion', controllers.chat.getSuggestion);



router.post('/meals', controllers.meals.addMeal);

router.get('/exercise/summary', controllers.exercise.getCaloriesByDays);


router.get('/exercise', controllers.exercise.getExerciseByDate);

router.post('/exercise', controllers.exercise.addExercise);

module.exports = router;
