require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require('axios');
// const cors = require("cors");
const morgan = require("morgan");
const { getUserById, upsertUser, addMeal } = require("./model.js");
const { sampleData } = require("./data.js");

const app = express();

// Use middleware
app.use(morgan('dev'));
app.use(express.json());

// api
const options = {
  headers: {
    'x-app-id': process.env.API_ID,
    'x-app-key': process.env.API_KEY,
    'Content-Type': 'application/json'
  }
};

app.get('/users/:uid', async (req, res) => {
  console.log("IM IN GET USER");
  getUserById(req.params, (err, data) => {
    if (err) {
      console.error('ERR WITH RETRIEVING DATA FROM DB: ', err);
      res.sendStatus(400);
    } else {
      // console.log('SUCCESS WITH RETRIEVING DATA FROM DB: ', data);
      res.status(200).json(data);
    }
  })
});

app.post('/users', (req, res) => {
  console.log("IM IN POST USER");
  upsertUser(req.body, (err) => {
    if (err) {
      console.error('ERR WITH RETRIEVING DATA FROM DB: ', err);
      res.sendStatus(400);
    } else {
      res.status(200).json({ message: 'User created successfully' });
    }
  });
});

app.post('/meals', (req, res) => {
  console.log("IM IN POST MEAL: ", req.body.food);

  const query = req.body.food;
  const data = {
    query: query,
    timezone: 'US/Eastern'
  };

  const user_id = req.body.user_id;
  console.log('user_id in control: ', user_id);


  axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', data, options)
    .then(response => {
      const foods = response.data.foods.map(food => ({
        food_name: food.food_name,
        nf_calories: food.nf_calories,
      }));

      // insert foods into meal collection
      addMeal(user_id, foods,  (err) => {
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
});




app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
