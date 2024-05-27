import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={{width:'100%', paddingVertical:15,  backgroundColor:'#ff4c24', marginHorizontal:0}}>
      <Text style={{textAlign:'center', fontSize:24, fontWeight:600, color:'#fff'}}>Attendance Management System</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({})