import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Image,} from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomTextInput from '../components/CustomTextInput.jsx';
import { useAuth } from '../AuthContext';
import LoginService from '../services/LoginService.jsx';

function Login ({ navigation }) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (username === '' || password === '') {
            alert('Please fill all the fields');
            return;
        } else {
            await LoginService.login({
                email: username,
                password: password,
            }).then((response) => {
                console.log(response);
                if (response === null) {
                    alert('Invalid username or password');
                    return;
                } else {
                    login({type: 'login', payload: response.token});
                    navigation.navigate('Home');
                }
            }).catch((error) => {
                console.log(error);
                alert('Failed to login');
            });
        }
    };

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
                  onPress={handleLogin}
              />

              <CustomButton 
                  title="Create Account" 
                  colorScheme="clear"
                  onPress={() => navigation.navigate('ParentRegister')}
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
