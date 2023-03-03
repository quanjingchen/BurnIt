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
      { $match: { date: { $gte: date1, $lt: date2 } } },
      { $group: { _id: "$activity_name", totalCalories: { $sum: "$nf_calories" } } },
      { $project: { x: "$_id", y: "$totalCalories", _id: 0 } }
    ])
      .then(result => callback(null, result))
      .catch(err => callback(err))
  }
};