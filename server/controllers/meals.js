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

  getMealByDate: (req, res) => {
    const { date1, date2, user_id } = req.query;
    console.log('CONTROLLER date1: ', date1);
    console.log('CONTROLLER date2: ', date2);
    models.meals.getMealByDate(date1, date2, user_id, (err, result) => {
      if (err) {
        console.error('ERR WITH GETING MEAL FROM DB: ', err);
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
        console.log('GETING MEAL FROM DB SUCCESSFULLY:', result);
      }
    });
  },

  getCaloriesByDays: (req, res) => {
    const { days, user_id } = req.query;
    models.meals.getCaloriesByDays(days, user_id, (err, result) => {
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

  addMeal: (req, res) => {
    // console.log("IM IN POST MEAL: ", req.body.food);
    const query = req.body.food;
    const data = {
      query: query,
      timezone: 'US/Eastern'
    };
    const user_id = req.body.user_id;
    // console.log('user_id in control: ', user_id);
    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', data, options)
      .then(response => {
        const foods = response.data.foods.map(food => ({
          food_name: food.food_name,
          nf_calories: food.nf_calories,
        }));
        // insert foods into meal collection
        models.meals.addMeal(user_id, foods, (err, result) => {
          if (err) {
            console.error('ERR WITH POSTING MEAL TO DB: ', err);
          } else {
            res.status(201).json({ message: 'Meals created successfully' });
          }
        });

      })
      .catch(error => {
        console.log(error);
        res.send({ success: false });
      });
  }

};