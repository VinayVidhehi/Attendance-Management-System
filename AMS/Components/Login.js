import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();

  const [fpkey, setFpkey] = useState(0);
  const [buttonMessage, setButtonMessage] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(0);

  const handleForgetPasswordClick = async () => {
    if (fpkey === 0) {
      setFpkey(1);
      setButtonMessage("Change Password");
    }
  };

  const AlertButton = (text) =>
    Alert.alert("Login", `${text}`, [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);

  const handleLogin = async () => {
    if (fpkey === 0) {
      console.log("am i here");
      setLoading(1);
      const response = await axios.post(
        "https://ams-server-0djz.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (response.data.key === 1) {
        setLoading(0);
        try {
          await AsyncStorage.setItem("amsemail", email);
          AlertButton("Login Successfull");
        } catch (error) {
          console.log("error while storing user details");
        }
      } else {
        setLoading(0);
        Alert.alert("Login Failed", response.data.message);
      }
    } else if (fpkey === 1) {
      if (newPassword !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      }
      setLoading(1);
      const response = await axios.post(
        "https://ams-server-0djz.onrender.com/forget-password",
        {
          email,
          newPassword,
          confirmPassword,
        }
      );
      setLoading(0);
      if (response.data.key === 1) {
        setFpkey(0);
        setButtonMessage("Login");
        Alert.alert("Password Reset", response.data.message);
      } else {
        Alert.alert("Password Reset Failed", response.data.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ marginTop: 60, width: "80%" }}>
        <View style={styles.topContainer}>
          <Text style={styles.heading}>Login</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "left" }}>
            Welcome
          </Text>
          <Text style={styles.subHeading}>Sign in to continue!</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {fpkey === 0 ? (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable onPress={handleForgetPasswordClick}>
                <Text style={styles.forgetPassword}>Forget Password?</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  secureTextEntry={true}
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
              </View>
            </>
          )}
          <Pressable
            onPress={handleLogin}
            style={{
              backgroundColor: "#ff4c24",
              width: "80%",
              margin: "auto",
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
            }}
          >
            {loading==1 ? (
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
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>I'm a new user.</Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "#ddd",
    marginTop: 30,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: 0,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ff4c24",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  signupButtonText: {
    color: "#ff4c24",
    fontSize: 14,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666666",
    marginBottom: 16,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 24,
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
  },
  forgetPassword: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6610f2",
    marginTop: 8,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666666",
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6610f2",
    marginLeft: 4,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
