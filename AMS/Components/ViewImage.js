import React, { useState } from 'react';
import { Image, View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Base64Image = ({ base64Data, email }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  const handleUpload = async () => {
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('https://ams-server-0djz.onrender.com/uploadImage', {
        email: email,
        image: base64Data,
      });

      if (response.data.key == 1) {
        setUploadSuccess(true);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      setErrorMessage('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRetake = () => {
    navigation.goBack();
  };

  if (uploadSuccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>Thanks for uploading the image!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${base64Data}` }}
        style={styles.image}
      />
      {isUploading ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Please wait until the image is uploaded...</Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable  onPress={handleUpload} style={{ paddingVertical:6, backgroundColor:'#ff4c24', margin:'auto', borderRadius:2, paddingHorizontal:15}}><Text style={{color:"#fff", fontSize:18, textAlign:'center', fontWeight:500}}>Upload Image</Text></Pressable>
          <Pressable onPress={handleRetake} style={{ paddingVertical:6, backgroundColor:'#ff4c24', margin:'auto', borderRadius:2, paddingHorizontal:15}}><Text style={{color:"#fff", fontSize:18, textAlign:'center', fontWeight:500}}>Retake Image</Text></Pressable>
        </View>
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },
  image: {
    width: 350,
    height: 600,
  },
  activityContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  successText: {
    fontSize: 18,
    color: 'green',
  },
});

export default Base64Image;
