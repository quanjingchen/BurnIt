const models = require('../models');
const axios = require('axios');

// api
const options = {
  headers: {
    'x-app-id': process.env.API_ID,
    'x-app-key': process.env.API_KEY,
    'Content-Type': 'application/json'
  }
};

module.exports = {

  getExerciseByDate: (req, res) => {
    const {date1, date2, user_id} = req.query;
    console.log('CONTROLLER date1: ', date1);
    console.log('CONTROLLER date2: ', date2);
    models.exercise.getExerciseByDate(date1, date2, user_id, (err, result) => {
      if (err) {
        console.error('ERR WITH GETING exercise FROM DB: ', err);
        res.sendStatus(400);
      } else {
        // sort the food by calories
        result.sort((a, b) => b.y - a.y);
        const capitalizedData = result.map(item => ({
          x: item.x.charAt(0).toUpperCase() + item.x.slice(1),
          y: item.y
        }));
        // sent the top 5 foods to the client
        res.status(200).json(capitalizedData);
        console.log('GETING exercise FROM DB SUCCESSFULLY:', result);
      }
    });
  },
  getCaloriesByDays: (req, res) => {
    const { days, user_id } = req.query;
    models.exercise.getCaloriesByDays(days, user_id, (err, result) => {
      if (err) {
        console.error('ERR WITH GETING MEAL Calories FROM DB: ', err);
        res.sendStatus(400);
      } else {

        // sent the line chart data to the client
        res.status(200).json(result);
        console.log('GETING MEAL Calories FROM DB SUCCESSFULLY:', result);
      }
    });
  },

  addExercise: (req, res) => {
    // console.log("IM IN POST MEAL: ", req.body.activity);
    const query = req.body.exercise;
    const { gender, weight_kg, height_cm, age } = req.body.user;
    const data = {
      query,
      gender,
      weight_kg,
      height_cm,
      age
    };
    const user_id = req.body.user.uid;
    // console.log('user_id in control: ', user_id);
    axios.post('https://trackapi.nutritionix.com/v2/natural/exercise', data, options)
      .then(response => {
        const exercise = response.data.exercises.map(activity => ({
          activity_name: activity.name,
          nf_calories: activity.nf_calories,
        }));
        console.log('exercise Data from API', exercise);

        // insert exercise into meal collection
        models.exercise.addExercise(user_id, exercise,  (err, result) => {
          if (err) {
            console.error('ERR WITH POSTING EXERCISE TO DB: ', err);
          } else {
            console.log('EXERCISE created successfully') ;
          }
        });
        // sort the activity by nf_calories
        const sortedexercise = exercise.sort((a, b) => b.nf_calories - a.nf_calories);
        // get the top 5 exercise with largest nf_calories
        const top5exercise = exercise.slice(0, 5);
        // sent the top 5 exercise to the client
        const pieChartData = top5exercise.map(activity => ({
          x: activity.activity_name.charAt(0).toUpperCase() + activity.activity_name.slice(1),
          y: activity.nf_calories
        }));
        res.status(201).json(pieChartData);
      })
      .catch(error => {
        console.log(error);
        res.send({ success: false });
      });
  }
};