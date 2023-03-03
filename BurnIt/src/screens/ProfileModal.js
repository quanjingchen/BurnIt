import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileModal = ({ user, setUser, toggleProfileModal, handleCreateUser }) => {
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [weight, setWeight] = useState(user.weight_kg.toString());
  const [height, setHeight] = useState(user.height_cm.toString());
  const [age, setAge] = useState(user.age.toString());

  const handleUploadPhoto = () => {
    // Implement photo uploading logic here
    // You can use a library like react-native-image-picker to handle the selection of an image from the user's camera roll
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      gender,
      weight_kg: Number(weight),
      height_cm: Number(height),
      age: Number(age),
    };
    setUser(updatedUser);
    toggleProfileModal();
    handleCreateUser(updatedUser);
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>

        <Text style={styles.heading}>Profile Information</Text>


        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Gender:</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Female"
            onPress={() => handleGenderChange('female')}
            color={gender === 'female' ? '#F66D44' : '#000000'}
          />
          <Button
            title="Male"
            onPress={() => handleGenderChange('male')}
            color={gender === 'male' ? '#2D87BB' : '#000000'}
          />
        </View>

        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput style={styles.input} value={weight} onChangeText={setWeight} />

        <Text style={styles.label}>Height (cm):</Text>
        <TextInput style={styles.input} value={height} onChangeText={setHeight} />

        <Text style={styles.label}>Age:</Text>
        <TextInput style={styles.input} value={age} onChangeText={setAge} />
        <View style={styles.uploadContainer}>
          <TouchableOpacity onPress={handleUploadPhoto}>
            <Text style={styles.uploadButtonText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.buttonContainer}>
          <Button title="Quit" onPress={toggleProfileModal} />
          <Button title="Save" onPress={handleSave} />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,

  },
  uploadButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

export default ProfileModal;
