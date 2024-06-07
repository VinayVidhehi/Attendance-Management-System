import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";

const Base64Image = ({ base64Data }) => {
  const [email, setEmail] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const retrieveEmail = async () => {
      const userEmail = await AsyncStorage.getItem("amsemail");
      setEmail(userEmail);
    };
    retrieveEmail();
  }, []);

  const chunkSize = 1024 * 64; // 1MB chunk size

  const handleUpload = async () => {
    setIsUploading(true);
    setErrorMessage(null);

    const totalChunks = Math.ceil(base64Data.length / chunkSize);

    try {
      for (let i = 0; i < totalChunks; i++) {
        const chunk = base64Data.slice(i * chunkSize, (i + 1) * chunkSize);
        const isLastChunk = i === totalChunks - 1;
        await axios.post("https://ams-server-0djz.onrender.com/uploadImage", {
          email,
          chunk,
          sequenceNumber: i,
          isLastChunk,
        });
      }

      setUploadSuccess(true);
    } catch (error) {
      setErrorMessage("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRetake = () => {
    navigation.goBack();
  };

  if (uploadSuccess) {
    return (
      <View style={{flex:1, marginTop:26, alignItems:'center', justifyContent:'flex-start'}}>
        <Header />
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
          <Text style={styles.loadingText}>
            Please wait until the image is uploaded...
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleUpload} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </Pressable>
          <Pressable onPress={handleRetake} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Retake Image</Text>
          </Pressable>
        </View>
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 600,
  },
  activityContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "80%",
  },
  uploadButton: {
    paddingVertical: 6,
    backgroundColor: "#ff4c24",
    margin: "auto",
    borderRadius: 2,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  successText: {
    fontSize: 18,
    color: "green",
  },
});

export default Base64Image;
