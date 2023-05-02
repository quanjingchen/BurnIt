import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '@env';
import axios from 'axios'
import auth from '../../firebaseSetup';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../state/actions';

const ProfileModal = ({ toggleProfileModal, handleCreateUser }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [profile_url, setProfile_url] = useState(user.profile_url);
  const [gender, setGender] = useState(user.gender);
  const [weight, setWeight] = useState(user.weight_kg.toString());
  const [height, setHeight] = useState(user.height_cm.toString());
  const [age, setAge] = useState(user.age.toString());
  const [loading, setLoading] = React.useState(false);
  const [photo, setPhoto] = useState();
  const navigation = useNavigation();


  const handleUploadPhoto = async () => {
    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    }

    setLoading(true); // set loading to true when user selects a photo

    let result = await ImagePicker.launchImageLibraryAsync()
    let base64Data;
    if (!result.canceled) {
      const data = await fetch(result.assets[0].uri);
      const blob = await data.blob();
      base64Data = await blobToBase64(blob);
      const formData = new FormData();
      await formData.append('file', base64Data);
      await formData.append('upload_preset', 'cytbyzx8');
      await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
        .then(res => {
          // console.log('res.data.secure_url: ', res.data.secure_url);
          setProfile_url(res.data.secure_url);
          setPhoto(res.data.secure_url);
          setLoading(false); // set loading back to false when photo is uploaded
          // console.log('success with uploading photo to cloudinary: ', res.data.secure_url);
        })
        .catch(err => console.error('err with uploading photo to cloudinary: ', err))
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      gender,
      profile_url,
      weight_kg: Number(weight),
      height_cm: Number(height),
      age: Number(age),
    };
    dispatch(setUser(updatedUser)); // dispatch the setUserAction action creator instead of calling setUser
    toggleProfileModal();
    handleCreateUser(updatedUser);
    setPhoto('');
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
  };

  const handleLogOut = () => {
    auth.signOut();
    navigation.navigate('SignIn');

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
            color={gender === 'female' ? 'grey' : 'white'}
          />
          <Button
            title="Male"
            onPress={() => handleGenderChange('male')}
            color={gender === 'male' ? 'grey' : 'white'}
          />
          <Button
            title="Other"
            onPress={() => handleGenderChange('other')}
            color={gender === 'other' ? 'grey' : 'white'}
          />
        </View>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput style={styles.input} value={weight} onChangeText={setWeight} />
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput style={styles.input} value={height} onChangeText={setHeight} />
        <Text style={styles.label}>Age:</Text>
        <TextInput style={styles.input} value={age} onChangeText={setAge} />
        <View style={styles.uploadContainer}>
          <TouchableOpacity onPress={handleUploadPhoto} style={styles.uploadButton}>
            <MaterialCommunityIcons name="camera-outline" size={24} color="white" />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator />}
        {photo && <View style={{alignItems: 'center'}}>
          <Image source={{ uri: photo }} style={styles.postPhoto} />
        </View>}
        <View style={styles.buttonContainer}>
          <Button title="Quit" onPress={toggleProfileModal} />
          <Button title="Save" onPress={handleSave} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Log out" onPress={handleLogOut} color="#FF0000" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'black',
    padding: 20,
    paddingTop:30,
    width: '80%',
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom:7,
    color: '#FFF'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    color: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  uploadText: {
    marginLeft: 10,
    color: '#FFF'

  },
  postPhoto: {
    height: 50,
    width: 50,
    marginVertical: 5,
  },
});

export default ProfileModal;
