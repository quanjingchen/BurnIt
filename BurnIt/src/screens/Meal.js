import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const Meal = ({ user }) => {
  const colors = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];
  const [inputText, setInputText] = useState('');

  const [food, setFood] = useState([
    { x: "Eggs", y: 150 },
    { x: "Bacon", y: 100 },
    { x: "Coffee", y: 5 }
  ]);
  const widthAndHeight = 250;
  const handleAddButtonPress = () => {
    // Send a post request to the server with the inputText
    if (inputText === '') {
      console.log('input is empty');
      return;
    }
    console.log('post meal to server');
    axios.post('http://localhost:3000/meals', { food: inputText, user_id: user.uid})
      .then(response => {
        // Update the food state with the response from the server
        setFood(response.data);
        // Clear the input text
        setInputText('');
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calories: + {Math.floor(food.reduce((accumulator, current) => accumulator + current.y, 0))}</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <VictoryPie
          width={350}
          height={350}
          data={food}
          innerRadius={40}
          colorScale={colors}
          style={{
            labels: {
              fill: 'black', fontSize: 15, padding: 7,
            },
          }}
        >
        </VictoryPie>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>What did you eat today?</Text>
        <MaterialCommunityIcons
          style={styles.micIcon}
          name="chat-processing-outline"
          color={'black'}
          size={40} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          style={styles.micIcon}
          name="microphone"
          size={26}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          value={inputText}
          onChangeText={setInputText}
          placeholder="e.g., for breakfast, I had two eggs, two slices of bacon, and coffee "
        />
        <View style={styles.buttonContainer}>
        <Button title="Add" onPress={handleAddButtonPress} />
        </View>
      </View>

    </View>
  );
};

export default Meal;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 20
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },

  input: {
    fontSize: 16,
    flex: 1,
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flex: 0,
  },
  micIcon: {
    marginRight: 5,
  }
});