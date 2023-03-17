
const models = require('../models');
const axios = require('axios');

// api
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

module.exports = {
  getSuggestion: async (req, res) => {
    const { user_id } = req.query;
    const data1 = await models.meals.getMealCaloriesByDay(user_id);
    const data2 = await models.exercise.getExerciseCaloriesByDay(user_id);
    if (data1.length === 0 && data2.length === 0) {
      res.status(200).json(`Hey there! I'm Calor, your personal calories counselor. Just tell me what you eat and do, and I'll help you stay on track with your health goals. Let's get started!`);
      return;
    }
    if (data1.length < 1 || data2.length < 1) {
      res.status(200).json('Hey, I need more data to give better suggestions. What else did you have for meals and exercise?');
      return;
    }
    const prompt = `Imagine you're a hilarious personal calorie consoler. I'll give you my meal and exercise data and you give one suggestion in 30 words or less with cute emoji. No formalities! Here is my meal data for the last few days, ${JSON.stringify(data1)}, and my activity data, ${JSON.stringify(data2)}`;
      // console.log(prompt);
      var data = {
      "messages": [{"role": "user", "content": prompt}],
      "model": "gpt-3.5-turbo",
      "temperature": 0.7,
      "max_tokens": 100,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    };
      var option = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.OPENAI_API_KEY}`
      }}
      axios.post(API_ENDPOINT, data, option)
      .then(result => {console.log(result.data.choices[0].message.content); res.status(200).json(result.data.choices[0].message.content)})
      .catch(err => console.error('error is: ', err))
  }

}

