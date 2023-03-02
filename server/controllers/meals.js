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
        models.meals.addMeal(user_id, foods,  (err, result) => {
          if (err) {
            console.error('ERR WITH POSTING MEAL TO DB: ', err);
          } else {
            console.log('meal created successfully') ;
          }
        });
        // sort the food by nf_calories
        const sortedFoods = foods.sort((a, b) => b.nf_calories - a.nf_calories);
        // get the top 5 foods with largest nf_calories
        const top5Foods = foods.slice(0, 5);
        // sent the top 5 foods to the client
        const pieChartData = top5Foods.map(food => ({
          x: food.food_name.charAt(0).toUpperCase() + food.food_name.slice(1),
          y: food.nf_calories
        }));
        res.status(201).json(pieChartData);
      })
      .catch(error => {
        console.log(error);
        res.send({ success: false });
      });
  }

};