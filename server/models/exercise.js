var { Exercise } = require('../db');
module.exports = {
  addExercise: async (user_id,exerciseData, callback) => {
    // console.log('user_id in model: ', user_id);
    // console.log('foodData in model: ', foodData);
    const activityData = exerciseData.map(({ activity_name, nf_calories }) => ({
      user_id: user_id, // or you can get it from the req object
      date: new Date(),
      activity_name: activity_name,
      nf_calories: nf_calories
    }));

    Exercise.create(activityData)
      .then(result => callback(null, result))
      .catch(err => callback(err))
  },


  getExerciseByDate: (date1, date2, user_id, callback) => {
    console.log('date1: ',typeof date1);
    console.log('date2: ', typeof date2);
    date1 = new Date(date1);
    date2 = new Date(date2);
    Exercise.aggregate([
      { $match: { user_id: user_id, date: { $gte: date1, $lt: date2 } } },
      { $group: { _id: "$activity_name", totalCalories: { $sum: "$nf_calories" } } },
      { $project: { x: "$_id", y: "$totalCalories", _id: 0 } }
    ])
      .then(result => callback(null, result))
      .catch(err => callback(err))
  },

  getCaloriesByDays: (days, user_id, callback) => {
    var startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    Exercise.aggregate([
      { $match: { user_id: user_id, date: { $gte: startDate } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, totalCalories: { $sum: '$nf_calories' } } },
      { $sort: { _id: 1 } }
    ])
    .then(result => callback(null, result))
    .catch(err => callback(err))
  },

  getExerciseCaloriesByDay: (user_id) => {
    var startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return Exercise.aggregate([
      { $match: { user_id: user_id, date: { $gte: startDate } } },
      { $group: { _id: { activity_name: '$activity_name', date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } }, totalCalories: { $sum: '$nf_calories' } } },
      { $group: { _id: '$_id.date', foods: {
            $push: { f: '$_id.activity_name', c: '$totalCalories' }
          } } },
      { $project: { _id: 0, date: '$_id', foods: 1 } }
    ]);
  }
};