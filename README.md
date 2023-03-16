<h1 align="center">
  <br>
    BurnIt
    <h4 align="center">
        <i>"A mobile chatbot that tracks daily physical activity and calorie intake, and offers personalized recommendations."</i>
      <br>
    </h4>
    <h4 align="center">
        <i>Empowed by ChatGPT gpt-3.5-turbo and Nutritionix NLP API</i>
      <br>
    </h4>
    <br>
</h1>


## Technologies used

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## See how it works
View the demo video [here](https://www.youtube.com/watch?v=QCMdGffHX-E)


## Authentication and Login

<ul>
  <li>Uses Firebase for authentication</li>
  <li>Allows users to log in with their Facebook account</li>
</ul>


## Summary Screen

<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/19434669/223033513-8943f7f9-2a90-4ecc-bdef-2baa9fb54f6d.png" alt="Summary screen" width="400" style="margin-right: 20px;"></td>
    <td>
      <ul>
        <li>Displays a summary of the user's calorie intake and outtake.</li>
        <li>Uses ChatGPT gpt-3.5-turbo to generate a quick and personalized suggestion on user's calorie intake and physical activity.</li>
        <li>Includes a date selector that allows the user to choose to display last 7 days or last 30 days.</li>
        <li>Includes a line chart that visualizes the user's calorie intake and outtake over time.</li>
        <li>Clicking on the profile avatar will open a modal that allows the user to edit their profile information.</li>  
      </ul>
    </td>
  </tr>
</table>

## Meal Logging Screen

<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/19434669/223036250-c9fb2b69-a2d6-4ff5-9f95-3b3e57d376d5.png" alt="Summary screen" width="400" /></td>
    <td>
      <ul>
        <li>Allows the user to log their meals and track their calorie intake.</li>
        <li>Allows the user to enter the food items using natural language input.</li>
        <li>Leverages the power of Nutritionix NLP API to calculate the calorie intake of the user's meals.</li>
        <li>Displays the calorie content of each food item in a meal using a pie chart.</li>  
        <li>Allows users to quickly and easily understand the proportion of calories contributed by each food item in their meal.</li>  
      </ul>
    </td>
  </tr>
</table>



## Exercise Logging Screen

<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/19434669/223045581-2900cc77-28c7-4c73-a251-0b45857f5324.png" alt="Summary screen" width="400" /></td>
    <td>
      <ul>
        <li>Allows the user to log their exercise and track their calorie outtake.</li>
        <li>Allows the user to enter the activities using natural language input.</li>
        <li>Leverages the power of Nutritionix NLP API to calculate the calorie outtake of the user's exercise.</li>
        <li>Displays the calorie outtake of each activity item using a pie chart.</li>  
        <li>Allows users to quickly and easily understand the proportion of calories contributed by each activity.</li>  
      </ul>
    </td>
  </tr>
</table>

