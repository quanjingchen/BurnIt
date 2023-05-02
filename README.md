<h1 align="center">
  <br>
    BurnIt
    <h4 align="center">
        <i>"A mobile chatbot that tracks daily physical activity and calorie intake, and offers personalized recommendations."</i>
      <br>
    </h4>
    <h4 align="center">
        <i>Empowed by OpenAI gpt-3.5-turbo and Nutritionix NLP API</i>
      <br>
    </h4>
    <br>
</h1>


## Technologies used

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## See how it works
View the demo video [here](https://www.youtube.com/watch?v=McvzeZEbzJM)

<div align="center">
  
<img width="180" alt="product overview sample" src="https://user-images.githubusercontent.com/19434669/227030782-09274246-e384-4669-8bd9-3fd7e76e6e24.png">
<img width="180" alt="product overview sample" src="https://user-images.githubusercontent.com/19434669/227030998-39153b30-2593-4092-850c-c541481a4338.png">
<img width="180" alt="product overview sample" src="https://user-images.githubusercontent.com/19434669/227031136-89b32efe-ec33-4521-a756-20ed0a9380ef.png">
<img width="180" alt="product overview sample" src="https://user-images.githubusercontent.com/19434669/227031196-189cecae-e1ce-45a4-b50b-58e103dac7d1.png">
  
</div>


## Authentication and Login

<ul>
  <li>Uses Firebase for authentication.</li>
  <li>Allows users to log in with their social media accounts.</li>
</ul>


## Summary Screen

<ul>
  <li>Displays a summary of the user's calorie intake and outtake.</li>
  <li>Uses OpenAI gpt-3.5-turbo to generate a quick and personalized suggestion on user's calorie intake and physical activity.</li>
  <li>Includes a date selector that allows the user to choose to display last 7 days or last 30 days.</li>
  <li>Includes a line chart that visualizes the user's calorie intake and outtake over time.</li>
  <li>Clicking on the profile avatar will open a modal that allows the user to edit their profile information and log out.</li>  
</ul>


## Meal/Exercise Logging Screen
 
<ul>
  <li>Allows the user to log their meals/exercise and track their calorie intake/outtake.</li>
  <li>Allows the user to enter the food/activity items using natural language input.</li>
  <li>Leverages the power of Nutritionix NLP API to calculate the calorie intake/outtake of the user's meals.</li>
  <li>Displays the calorie content of each food/activity item in a meal using a pie chart.</li>  
  <li>Allows users to quickly and easily understand the proportion of calories contributed by each food/activity item with the pie charts.</li>  
</ul>

## Database Setup
The project uses MongoDB as the database and Mongoose for object modeling. The database includes three collections: User, Meal, and Exercise.

### User Schema
| Field       | Type   | Options                              |
|-------------|--------|--------------------------------------|
| _id         | String | required: true, unique: true         |
| name        | String |                                      |
| profile_url | String |                                      |
| gender      | String | enum: ['male', 'female'], default: 'female'   |
| weight_kg   | Number | default: 50                          |
| height_cm   | Number | default: 160                         |
| age         | Number | default: 30                          |

### Meal Schema
| Field       | Type   | Options                              |
|-------------|--------|--------------------------------------|
| user_id     | String | ref: 'User', required: true          |
| date        | Date   | default: Date.now, required: true    |
| food_name   | String |                                      |
| nf_calories | Number |                                      |

### Exercise Schema
| Field       | Type   | Options                              |
|-------------|--------|--------------------------------------|
| user_id     | String | ref: 'User', required: true          |
| date        | Date   | default: Date.now, required: true    |
| activity_name | String |                                    |
| nf_calories | Number |                                      |

## API Setup
The API is set up using the Model-View-Controller (MVC) architecture, with the following routes:

### User Routes

- **GET** `/users/:uid`: Get user data by user ID.
- **POST** `/users`: Create or update a user.

### Meal Routes

- **GET** `/meals`: Get meals for the present day.
- **GET** `/meals/summary`: Get a summary of calorie consumption for the past week (7 days) or the past month (30 days). It uses an aggregation query that filters documents based on user_id, groups them by date, calculates the total calories for each group, and sorts the results in ascending order by date.
- **POST** `/meals`: Add meal data.

### Exercise Routes

- **GET** `/exercise`: Get exercises for the present day .
- **GET** `/exercise/summary`: Get a summary of calorie outtake for the past week (7 days) or the past month (30 days).
- **POST** `/exercise`: Add exercise data.

### Suggestion Route

- **GET** `/meals/suggestion`: Get personalized meal and activity suggestions using OpenAI gpt-3.5-turbo API.
It accepts a GET request with a user_id query parameter. The function will first fetch the user's meal and activity data from the database using the `models.meals.getMealCaloriesByDay` and `models.exercise.getExerciseCaloriesByDay` functions.
If there's no data available for the user, it will respond with an appropriate message. If there's not enough data, it will ask the user to provide more information.
To generate personalized suggestions, it sends a request to OpenAI gpt-3.5-turbo API with a specially crafted prompt that includes the user's meal and activity data.
The prompt is:  `Imagine you're a hilarious personal calorie consoler. I'll give you my meal and exercise data and you give one suggestion in 30 words or less with cute emoji. No formalities! Here is my meal data for the last few days, ${JSON.stringify(data1)}, and my activity data, ${JSON.stringify(data2)}`

### OpenAI gpt-3.5-turbo API Configuration
The following configuration parameters are used to customize the suggestions:

  - `model`: "gpt-3.5-turbo"
  - `temperature`: 0.7
  - `max_tokens`: 100
  - `top_p`: 1
  - `frequency_penalty`: 0
  - `presence_penalty`: 0
  
These parameters can be adjusted to change the style and length of the suggestions.









