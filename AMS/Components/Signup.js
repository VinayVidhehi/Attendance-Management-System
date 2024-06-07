import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import axios from "axios";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [authenticate, setAuthenticate] = useState(0);
  const [buttonMessage, setButtonMessage] = useState("Request OTP");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    name: "",
    password: "",
    confirmPassword: "",
    usn: "", // New field for USN
  });
  const [isFormValid, setIsFormValid] = useState(""); // State variable to track form validity

  const Navigation = useNavigation();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = (data) => {
    if (!data.email.endsWith("@rvce.edu.in")) {
      setIsFormValid("Email should end with @rvce.edu.in");
      return false;
    }

    if (authenticate === 2) {
      if (data.name.length < 3) {
        setIsFormValid("Name should contain at least 3 characters");
        return false;
      }

      if (data.password.length < 6) {
        setIsFormValid("Password should be at least 6 characters long");
        return false;
      }

      if (data.password !== data.confirmPassword) {
        setIsFormValid("Passwords do not match");
        return false;
      }

      if (data.usn.length === 0) {
        setIsFormValid("USN cannot be empty");
        return false;
      }
    }
    setIsFormValid("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) {
      return;
    }
    setLoading(true);

    try {
      if (authenticate === 0) {
        // Send email for OTP receiving
        const response = await axios.post(
          "https://ams-server-0djz.onrender.com/signup",
          {
            key: 0,
            email: formData.email,
          }
        );

        if (response.data.key == 1) {
          setAuthenticate(1);
          setButtonMessage("Verify OTP");
          Alert.alert(
            "OTP sent",
            "Please enter the OTP sent to your mail ID to verify your email.",
            [{ text: "OK" }]
          );
        }
      } else if (authenticate === 1) {
        // Send OTP details for user verification
        const response = await axios.post(
          "https://ams-server-0djz.onrender.com/signup",
          {
            email: formData.email,
            otp: formData.otp,
            key: 1,
          }
        );

        if (response.data.key == 1) {
          setAuthenticate(2);
          setButtonMessage("Signup");
          Alert.alert(
            "Verified",
            "Your email is verified and safe with us. Please fill up the details to finish signing up :)",
            [{ text: "OK" }]
          );
        } else {
          setIsFormValid("Wrong OTP, try again with the right one");
        }
      } else {
        // Send final signup details
        const response = await axios.post(
          "https://ams-server-0djz.onrender.com/signup",
          {
            email: formData.email,
            name: formData.name,
            password: formData.password,
            usn: formData.usn, // Include USN in the final signup data
          }
        );

        if (response.data.key == 1) {
          Alert.alert("Signup successful", "Please login to continue.", [
            { text: "OK", onPress: () => Navigation.navigate("Login") },
          ]);
          Navigation.navigate("Home");
        } else {
          Alert.alert("Error", `${response.data.message}`, [{ text: "OK" }]);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during signup. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1}}>
      <Header />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid={true}
        extraScrollHeight={100}
      >
        <View style={{ marginTop: 100, width: "90%", height: "80%" }}>
          <View style={styles.topContainer}>
            <Text style={styles.heading}>Signup</Text>
          </View>
          <View style={styles.formContainer}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 10,
              }}
            >
              Welcome
            </Text>
          </View>
          <View
            style={{
              flex: 6,
              width: "90%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {authenticate < 3 && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChangeText={(value) => handleChange("email", value)}
                  style={styles.input}
                />
                <Text style={styles.helperText}>
                  Email should be a valid RVCE email address.
                </Text>
              </View>
            )}
            {authenticate === 1 && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>OTP</Text>
                <TextInput
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChangeText={(value) => handleChange("otp", value)}
                  style={styles.input}
                />
                <Text style={styles.helperText}>
                  OTP should be a valid OTP code.
                </Text>
              </View>
            )}
            {authenticate === 2 && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    placeholder="John"
                    value={formData.name}
                    onChangeText={(value) => handleChange("name", value)}
                    style={styles.input}
                  />
                  <Text style={styles.helperText}>
                    Name should contain at least 3 characters.
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    placeholder="Enter your password"
                    value={formData.password}
                    onChangeText={(value) => handleChange("password", value)}
                    secureTextEntry={true}
                    style={styles.input}
                  />
                  <Text style={styles.helperText}>
                    Password should be at least 6 characters long.
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChangeText={(value) =>
                      handleChange("confirmPassword", value)
                    }
                    secureTextEntry={true}
                    style={styles.input}
                  />
                  <Text style={styles.helperText}>
                    Confirm password should match the password.
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>USN</Text>
                  <TextInput
                    placeholder="Enter your USN"
                    value={formData.usn}
                    onChangeText={(value) => handleChange("usn", value)}
                    style={styles.input}
                  />
                  <Text style={styles.helperText}>USN should not be empty.</Text>
                </View>
              </>
            )}
          </View>
          <View style={{ marginVertical: 10, paddingVertical: 6, width: '70%', margin: 'auto' }}>
            <Text style={{ textAlign: 'center', color: 'red' }}>{isFormValid}</Text>
          </View>
          <View>
            <Pressable
              style={{
                width: "80%",
                backgroundColor: "#ff4c24",
                borderRadius: 2,
                paddingHorizontal: 10,
                paddingVertical: 6,
                margin: "auto",
              }}
              onPress={handleSubmit}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {buttonMessage}
                </Text>
              )}
            </Pressable>
          </View>
          <View style={styles.signupContainer}>
            <Text style={{ fontSize: 14, fontWeight: 500, alignItems: "center" }}>
              Already signed up?. Press here to
            </Text>
            <Pressable onPress={() => Navigation.navigate("Login")}>
              <Text style={styles.signupLink}>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  contentContainer: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 24,
    marginHorizontal: 5,
    width: "90%",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6610f2",
    marginLeft: 4,
    marginVertical: 10,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 5,
  },
  helperText: {
    color: "gray",
    textAlign: "center",
  },
});

export default Signup;
