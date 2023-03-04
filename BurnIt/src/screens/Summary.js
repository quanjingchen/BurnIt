import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import app from '../../firebaseSetup';
import ProfileModal from './ProfileModal.js';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';



const Summary = ({ user, setUser, currentUser, handleCreateUser }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [days, setDays] = useState(7); // default to last 7 days
  const [chartData, setChartData] = useState();


  const handleLast7Days = () => {
    setDays(7);
  };

  const handleLast30Days = () => {
    setDays(30);
  };

  const handleGetCaloriesIntake = () => {
    axios.get('http://localhost:3000/meals/summary', { params: { days, user_id: user.uid } })
      .then(response => {
        const data1 = response.data;
        // Format the data for the chart
        axios.get('http://localhost:3000/exercise/summary', { params: { days, user_id: user.uid } })
          .then(response => {
            const data2 = response.data;
            const combinedData = [];
            data1.forEach((item) => {
              const matchingItem = data2.find((elem) => elem._id === item._id);
              combinedData.push({
                date: item._id,
                intake: item.totalCalories,
                outtake: matchingItem ? matchingItem.totalCalories : 0,
              });
            });

            data2.forEach((item) => {
              const matchingItem = data1.find((elem) => elem._id === item._id);
              if (!matchingItem) {
                combinedData.push({
                  date: item._id,
                  intake: 0,
                  outtake: item.totalCalories,
                });
              }
            });

            combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));


            const chartData = {
              labels: combinedData.map(item => item.date),
              datasets: [
                {
                  data: combinedData.map(item => item.intake),
                  color: (opacity = 1) => `rgba(255, 109, 0, ${opacity})`, // blue
                  strokeWidth: 5
                },
                {
                  data: combinedData.map(item => item.outtake),
                  color: (opacity = 1) => `rgba(0, 135, 250, ${opacity})`, // red
                  strokeWidth: 5
                }
              ]
            };
            setChartData(chartData);
          })

      })
      .catch(error => {
        console.error(error);
      });

  }


  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  useEffect(handleGetCaloriesIntake, [days])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.dateContainer}>
          <Text style={[styles.dateText, { fontSize: 16 }]}>{currentDate}</Text>
          <Text style={[styles.dateText, { fontSize: 34 }]}>Summary</Text>
        </View>
        <View style={styles.userIconContainer}>
          <Avatar
            rounded
            source={{ uri: currentUser.photoURL }}
            size={50}
            containerStyle={{ marginRight: 10 }}
            onPress={toggleProfileModal}
          />
          <Text style={styles.userNameText}>{user.name.split(' ')[0]}</Text>
        </View>

      </View>
      <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Calories </Text>
      <View style={styles.textContainer}>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleLast7Days}>
          <Text style={[styles.showText, days === 7 && styles.selected]}>last 7 days</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleLast30Days}>
          <Text style={[styles.showText, days === 30 && styles.selected]}>last 30 days</Text>
        </TouchableOpacity>
      </View>
      {chartData &&
        <LineChart
          data={chartData}
          width={350}
          height={220}
          yAxisSuffix=" cal"
          yAxisInterval={250}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#2C3639',
            backgroundGradientTo: '#2C3639',
            decimalPlaces: 0,
            color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "3",
              // strokeWidth: "2",
              // stroke: "#ffa726"
            }
          }}
          bezier
          style={styles.chart}
          withVerticalLabels={false} // hide x-axis labels
        />}

      <View style={styles.legend}>
        <View style={[styles.legendItem, { backgroundColor: 'rgba(255, 109, 0, 1)' }]} />
        <Text style={styles.legendText}>Meal</Text>
        <View style={[styles.legendItem, { backgroundColor: 'rgba(0, 135, 250, 1)' }]} />
        <Text style={styles.legendText}>Exercise</Text>
      </View>

      <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Suggestion </Text>

      {/* <View style={styles.suggestionContainer}>
      {chartData ?    <Text style={styles.suggestionText}> Hey there! I'm Calor, your personal calories counselor. Just tell me what you eat and do, and I'll help you stay on track with your health goals. Let's get started! </Text> : <Text style={styles.suggestionText}>I saw you've been eating a ton of burgers lately. How about trying a veggie stir-fry or something?</Text>}

      </View> */}

      <Modal visible={showProfileModal} animationType="slide">
        <ProfileModal user={user} setUser={setUser} toggleProfileModal={toggleProfileModal} handleCreateUser={handleCreateUser} />
      </Modal>

    </View>
  );
};

export default Summary;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "black",
    padding: 20,
    color: 'white'
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  userIconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateContainer: {
    alignItems: 'flex-start',
    flex: 1
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  userNameText: {
    fontSize: 16,
    marginTop: 5,
    color: 'white',
    marginRight: 10
    // fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  showText: {
    fontSize: 16,
    marginLeft: 45,
    color: 'white'
  },
  selected: {
    fontWeight: 'bold',
  },
  chart: {
    marginTop: 16,
    borderRadius: 16
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  legendItem: {
    width: 16,
    height: 16,
    marginRight: 4,
    marginLeft:70
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8
  },

  suggestionContainer: {
    width: 350,
    height: 100,
    marginTop: 12,
    backgroundColor: '#2C3639',
    borderRadius: 16,
    paddingTop: 15,
    paddingRight: 10,
    paddingLeft: 10,

  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontWeight: 'bold',
    lineHeight: 24

  }
});

