import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Meal = ({ setUpdate }) => {
  const user = useSelector((state) => state.user);
  const colors = ['#F66D44', '#FEAE65', '#E6F69D', '#AADEA7', '#64C2A6', '#2D87BB'];
  const displayNumber = 5;

  const [inputText, setInputText] = useState('');

  const [food, setFood] = useState([]);
  const widthAndHeight = 250;

  const handleGetMeals = (date1, days) => {
    date1 = date1 || new Date();
    date1.setHours(0, 0, 0, 0);
    days = days || 1;
    let date2 = new Date(date1);
    date2.setDate(date1.getDate() + days);
    // console.log('date: ', date1, date1)
    axios.get('http://localhost:3000/meals', { params: { date1, date2, user_id: user.uid } })
      .then(response => {
        // Update the food state with the response from the server
        setFood(response.data);
        // console.log('get meal by date', response.data)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAddButtonPress = () => {
    // Send a post request to the server with the inputText
    if (inputText === '') {
      // console.log('input is empty');
      return;
    }
    // console.log('post meal to server');
    axios.post('http://localhost:3000/meals', { food: inputText, user_id: user.uid })
      .then(response => {
        // Clear the input text
        setInputText('');
        handleGetMeals();
        setUpdate(prevState => !prevState);
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(handleGetMeals, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calories: + {Math.floor(food.reduce((accumulator, current) => accumulator + current.y, 0))}</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <VictoryPie
          width={400}
          height={400}
          cornerRadius={({ datum }) => datum.y * 5}
          data={food && food.length > 0 ? food.slice(0, displayNumber) : [{ x: "Add food", y: 100 }]}
          innerRadius={40}
          colorScale={colors}
          style={{
            labels: {
              fill: 'black', fontSize: 16, padding: -70,
            },
          }}
        >
        </VictoryPie>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>Tell me what did you eat today?</Text>
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          style={styles.micIcon}
          name="microphone"
          size={36}
          color="white"
        />
        <TextInput
          style={styles.input}
          multiline={true}
          value={inputText}
          onChangeText={setInputText}
          placeholder="e.g., for breakfast, I had two eggs, two slices of bacon, and a cup of coffee. (Add specific details for accurate estimation)"
          placeholderTextColor="grey"

        />
        <View style={styles.buttonContainer}>
          <Button
            title="Add"
            onPress={handleAddButtonPress}
          />
        </View>
      </View>

    </View>
  );
};

export default Meal;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom:20
  },
  headerText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
    fontWeight:'bold',
    color: 'white'
  },
  promptContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  promptText: {
    fontSize: 18,
    marginRight: 15,
    marginBottom:10,
    color: 'white',
    fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },

  input: {
    fontSize: 16,
    flex: 1,
    height: 100,
    borderColor: '#2C3639',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2C3639',
    marginRight: 10,
    color: 'white',
    textAlignVertical: 'center'
  },
  buttonContainer: {
    // flex: 0,
  },
  micIcon: {
    marginRight: 10,
  }
});