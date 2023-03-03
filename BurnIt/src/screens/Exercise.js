import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const Exercise = ({ user }) => {
  const colors = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];
  const [inputText, setInputText] = useState('');

  const [exercise, setExercise] = useState([]);
  const widthAndHeight = 250;

  const handleGetExercise = (date1, days) => {
    date1 = date1 || new Date();
    date1.setHours(0, 0, 0, 0);
    days = days || 1;
    let date2 = new Date(date1);
    date2.setDate(date1.getDate() + days);
    // console.log('date: ', date1, date1)
    axios.get('http://localhost:3000/exercise', { params: { date1, date2, user_id: user.uid } })
      .then(response => {
        // Update the food state with the response from the server
        setExercise(response.data);
        // console.log('get meal by date', response.data)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAddButtonPress = () => {
    // Send a post request to the server with the inputText
    if (inputText === '') {
      console.log('input is empty');
      return;
    }
    console.log('post exercise to server');
    axios.post('http://localhost:3000/exercise', { exercise: inputText, user: user})
      .then(response => {
        // Clear the input text
        setInputText('');
        handleGetExercise();
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(handleGetExercise, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Calories: - {Math.floor(exercise.reduce((accumulator, current) => accumulator + current.y, 0))}</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <VictoryPie
          width={350}
          height={350}
          data={exercise && exercise.length > 0 ? exercise.slice(0, 5) : [{ x: "Add exercise", y: 100 }]}
          innerRadius={40}
          colorScale={colors}
          style={{
            labels: {
              fill: 'black', fontSize: 16, padding: -50,
            },
          }}
        >
        </VictoryPie>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>Which exercise you did today?</Text>
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
          placeholder="e.g., I ran for 2 miles and cooked dinner "
        />
        <View style={styles.buttonContainer}>
        <Button title="Add" onPress={handleAddButtonPress} />
        </View>
      </View>

    </View>
  );
};

export default Exercise;

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