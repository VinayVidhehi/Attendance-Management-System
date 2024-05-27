import {View, Text, StyleSheet, Image, ScrollView, Dimensions, Alert, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

const Home =() => {

  const Navigation = useNavigation();

  function handleNavigation() {
     Navigation.navigate("Captureimage");
  }
  return (
    <View style={{marginTop:26, flex:1, alignItems:'center', justifyContent:'flex-start', backgroundColor:"#ddd"}}>
      <Header />
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{color:'gray', textAlign:'center'}}>
          give us with your best shot, else we anyways deal with your NSAR XD
        </Text>
      <Pressable onPress={handleNavigation} style={{ paddingVertical:6, backgroundColor:'#ff4c24', width:'80%', margin:'auto', borderRadius:2, paddingHorizontal:15}}><Text style={{color:"#fff", fontSize:20, textAlign:'center', fontWeight:500}}>Upload Image</Text></Pressable>
      </View>
    </View>
  )
  
}

export default Home;