import React from "react";
import { View } from "react-native";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";

const App = () => {
    return (
        <View>
            <Home />
            <Login />
            <SignUp />
        </View>
    );
};

export default App;
