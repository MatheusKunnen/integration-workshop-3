import React, { useState } from 'react';
import {
  View,
  Text, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Image,
  Button,
} from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomTextInput from '../components/CustomTextInput.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Login ({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}> 
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={styles.container.backgroundColor} 
      />

      <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />

      <CustomTextInput 
        iconSource={require('../assets/user_icon.png')}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />

      <CustomTextInput 
        iconSource={require('../assets/lock_icon.png')}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      
      <CustomButton 
        title="Login" 
        colorScheme="dark"
        onPress={() => username !== '' && password !== '' ? navigation.navigate('Home', {username: username}) : alert('Invalid username or password')}
      />

      <CustomButton 
        title="Create Account" 
        colorScheme="clear"
        onPress={() => console.log('Sign Up button pressed')}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
  }
});

export default Login;
