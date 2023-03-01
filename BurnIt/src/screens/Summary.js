import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import app from '../../firebaseSetup';

const Summary = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  // console.log('USER: ', user);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        {user ? (
          <View style={styles.userIconContainer}>
            <Avatar
              rounded
              source={{ uri: user.photoURL }}
              size={70}
              containerStyle={{ marginRight: 10 }}
            />
            <Text style={styles.userNameText}>{user.displayName}</Text>
          </View>
        ) : null}
      </View>



      {/* Add the rest of your Summary component here */}
    </View>
  );
};

export default Summary;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    margin: 20
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userIconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'flex-start',
    flex: 1
  },
  dateText: {
    fontSize: 16,
    // fontWeight: 'bold',
  },
  userNameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

