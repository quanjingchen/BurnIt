import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal } from 'react-native';
import { Avatar } from 'react-native-elements';
import app from '../../firebaseSetup';
import ProfileModal from './ProfileModal.js';


const Summary = ({ user, setUser, currentUser, handleCreateUser}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

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
        {currentUser ? (
          <View style={styles.userIconContainer}>
            <Avatar
              rounded
              source={{ uri: currentUser.photoURL }}
              size={70}
              containerStyle={{ marginRight: 10 }}
              onPress={toggleProfileModal}
            />
            <Text style={styles.userNameText}>{user.name.split(' ')[0]}</Text>
          </View>
        ) : null}
      </View>

      <Modal visible={showProfileModal} animationType="slide">
        <ProfileModal user={user} setUser={setUser} toggleProfileModal={toggleProfileModal} handleCreateUser={handleCreateUser}/>
      </Modal>

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
    justifyContent:'center'
  },
  dateContainer: {
    alignItems: 'flex-start',
    flex: 1
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userNameText: {
    fontSize: 16,
    marginTop:5
    // fontWeight: 'bold',
  },
});

