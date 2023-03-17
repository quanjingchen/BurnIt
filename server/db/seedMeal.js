// Generate random date between 7 and 1 days ago
var { Meal } = require('../db');

function getRandomDate() {
  const currentDate = new Date();
  const yesterday = new Date(currentDate.getTime() - (1 * 24 * 60 * 60 * 1000))
  const sevenDaysAgo = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
  return new Date(sevenDaysAgo.getTime() + Math.random() * (yesterday.getTime() - sevenDaysAgo.getTime()));
}

// Generate random number between min and max
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Insert random meals for user 'RapirdTdI8PurYhOpXx1tdZtsTX2'
const meals = [];
const foods = ['rice', 'chicken', 'salad', 'pizza', 'pasta', 'steak', 'tacos'];

for (let i = 0; i < 100; i++) {
  meals.push({
    user_id: 'RapirdTdI8PurYhOpXx1tdZtsTX2',
    date: getRandomDate(),
    food_name: foods[Math.floor(Math.random() * foods.length)],
    nf_calories: Math.floor(getRandomNumber(100, 1000)),
  });
}

Meal.insertMany(meals)
.then(() => {
  console.log('All dummy data created successfully');
  process.exit(0);
})