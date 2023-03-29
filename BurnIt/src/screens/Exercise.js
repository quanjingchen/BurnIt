import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Exercise = ({ setUpdate }) => {
  const user = useSelector((state) => state.user);
  const colors = ['#2D87BB', '#64C2A6','#AADEA7','#E6F69D', '#FEAE65', '#F66D44'];
  const displayNumber = 5;
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
        setUpdate(prevState => !prevState);
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
          width={400}
          height={400}
          cornerRadius={({ datum }) => datum.y * 5}
          data={exercise && exercise.length > 0 ? exercise.slice(0, displayNumber) : [{ x: "Add exercise", y: 100 }]}
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
        <Text style={styles.promptText}>Tell me which exercise you did today?</Text>
        {/* <MaterialCommunityIcons
          style={styles.micIcon}
          name="chat-processing-outline"
          color={'black'}
          size={40} /> */}
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
          placeholder="e.g., I ran for 2 miles and cooked dinner (Add specific details for accurate estimation)"
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

export default Exercise;


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