import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CaptureImage from "./Components/CaptureImage";

const Stack = createNativeStackNavigator();

const App = () => {
  enableScreens();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            animation: "none",
          }}
        >
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Signup}
            name="Signup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Login}
            name="Login"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={CaptureImage}
            name="Captureimage"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
