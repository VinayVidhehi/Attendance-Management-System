import React from 'react';
import { View } from 'react-native';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

const App = () => {
    return (
        <View>
            <Home />
            <Login />
            <SignUp />
        </View>
    );
}

export default App;