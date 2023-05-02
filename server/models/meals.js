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
  },

  getMealByDate: (date1, date2, user_id, callback) => {
    // console.log('date1: ', typeof date1);
    // console.log('date2: ', typeof date2);
    date1 = new Date(date1);
    date2 = new Date(date2);
    Meal.aggregate([
      { $match: { user_id: user_id, date: { $gte: date1, $lt: date2 } } },
      { $group: { _id: "$food_name", totalCalories: { $sum: "$nf_calories" } } },
      { $project: { x: "$_id", y: "$totalCalories", _id: 0 } }
    ])
      .then(result => callback(null, result))
      .catch(err => callback(err))
  },

  getCaloriesByDays: (days, user_id, callback) => {
    var startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    Meal.aggregate([
      { $match: { user_id: user_id, date: { $gte: startDate } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, totalCalories: { $sum: '$nf_calories' } } },
      { $sort: { _id: 1 } }
    ])
      .then(result => callback(null, result))
      .catch(err => callback(err))
  },

  getMealCaloriesByDay: (user_id) => {
    var startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return Meal.aggregate([
      { $match: { user_id: user_id, date: { $gte: startDate } } },
      { $group: { _id: { food_name: '$food_name', date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } }, totalCalories: { $sum: '$nf_calories' } } },
      { $group: { _id: '$_id.date', foods: {
            $push: { f: '$_id.food_name', c: '$totalCalories' }
          } } },
      { $project: { _id: 0, date: '$_id', foods: 1 } }
    ]);
  }
};