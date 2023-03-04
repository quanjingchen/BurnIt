// Generate random date between 7 and 1 days ago
var { Exercise } = require('../db');

function getRandomDate() {
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
  return new Date(sevenDaysAgo.getTime() + Math.random() * (currentDate.getTime() - sevenDaysAgo.getTime()));
}

// Generate random number between min and max
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Insert random meals for user 'RapirdTdI8PurYhOpXx1tdZtsTX2'
const exercise = [];
const activities = ['running', 'walking', 'swimming', 'basketball', 'football', 'singing', 'jogging'];

for (let i = 0; i < 100; i++) {
  exercise.push({
    user_id: 'RapirdTdI8PurYhOpXx1tdZtsTX2',
    date: getRandomDate(),
    activity_name: activities[Math.floor(Math.random() * activities.length)],
    nf_calories: Math.floor(getRandomNumber(100, 1000)),
  });
}

Exercise.insertMany(exercise);
