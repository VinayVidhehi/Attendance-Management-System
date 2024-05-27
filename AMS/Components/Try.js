import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Try = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    usn: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Basic form validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name || !formData.usn) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (!formData.email.endsWith("@rvce.edu.in")) {
      Alert.alert("Error", "Email must be an rvce.edu.in email.");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Success", "Signup successful!");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <View style={styles.form}>
        <Text style={styles.heading}>Signup</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>USN</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your USN"
            value={formData.usn}
            onChangeText={(value) => handleChange("usn", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            secureTextEntry={true}
          />
        </View>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Signup</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    height: 40,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Try;
