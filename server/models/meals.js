var { Meal } = require('../db');
module.exports = {
  addMeal: async (user_id, foodData, callback) => {
    // console.log('user_id in model: ', user_id);
    // console.log('foodData in model: ', foodData);
    const mealData = foodData.map(({ food_name, nf_calories }) => ({
      user_id: user_id, // or you can get it from the req object
      date: new Date(),
      food_name: food_name,
      nf_calories: nf_calories
    }));

    Meal.create(mealData)
      .then(result => callback(null, result))
      .catch(err => callback(err))
  }
};